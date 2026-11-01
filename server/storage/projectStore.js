import { getDb } from '../db/mongo.js';

// Projects live in the MongoDB `projects` collection. Each document keeps the
// slug in `id` (unique index); Mongo's internal `_id` is never exposed to clients.
const projectsCollection = () => getDb().collection('projects');
const HIDE_MONGO_ID = { projection: { _id: 0 } };

// Canonical slug normalizer
export function normalizeSlug(slug) {
  if (!slug) return '';
  return slug
    .toLowerCase()
    .trim()
    .replace(/-sft/g, '')
    .replace(/-project/g, '')
    .replace(/-blueprint/g, '')
    .replace(/-attapur/g, '');
}

// Find index with exact or normalized fallback
function findProjectIndex(projects, slug) {
  const target = (slug || '').toLowerCase().trim();
  if (!target) return -1;
  const exact = projects.findIndex((p) => (p.id || '').toLowerCase() === target);
  if (exact !== -1) return exact;

  const normTarget = normalizeSlug(target);
  return projects.findIndex((p) => normalizeSlug(p.id) === normTarget);
}

export async function getAllProjects() {
  return projectsCollection()
    .find({}, HIDE_MONGO_ID)
    .sort({ stackOrder: 1, _id: 1 })
    .toArray();
}

export async function getProjectById(id) {
  const projects = await getAllProjects();
  const idx = findProjectIndex(projects, id);
  return idx !== -1 ? projects[idx] : null;
}

export async function saveProject(projectData) {
  const { _id, ...data } = projectData || {};
  const projects = await getAllProjects();
  const slug = (data.id || data.slug || '').trim().toLowerCase();

  if (!slug) {
    throw new Error('Project ID or slug is required.');
  }

  const existingIndex = findProjectIndex(projects, slug);
  const now = new Date().toISOString();

  let savedItem;
  if (existingIndex >= 0) {
    const existing = projects[existingIndex];
    savedItem = {
      ...existing,
      ...data,
      id: existing.id || slug,
      hoverImage: data.hoverImage !== undefined ? data.hoverImage : (existing.hoverImage || ''),
      updatedAt: now,
    };
    await projectsCollection().replaceOne({ id: existing.id }, savedItem);
  } else {
    savedItem = {
      id: slug,
      title: data.title || 'Untitled Project',
      location: data.location || 'Telangana, India',
      category: data.category || 'Land Development',
      status: data.status || 'ongoing',
      isBlueprint: Boolean(data.isBlueprint),
      featured: Boolean(data.featured),
      isPinned: data.isPinned !== undefined ? Boolean(data.isPinned) : true,
      stackOrder: data.stackOrder !== undefined ? Number(data.stackOrder) : projects.length,
      progressPercent: Number(data.progressPercent) || 0,
      milestones: Array.isArray(data.milestones) ? data.milestones : [],
      heroImage: data.heroImage || '',
      hoverImage: data.hoverImage || '',
      placeholderGradient: data.placeholderGradient || 'linear-gradient(135deg, #1C2321 0%, #0D1B2A 100%)',
      summary: data.summary || '',
      description: data.description || '',
      scope: data.scope || '',
      architecturalHighlights: Array.isArray(data.architecturalHighlights) ? data.architecturalHighlights : [],
      materialsAndAmenities: Array.isArray(data.materialsAndAmenities) ? data.materialsAndAmenities : [],
      pullQuote: data.pullQuote || '',
      galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
      beforeImage: data.beforeImage || '',
      afterImage: data.afterImage || '',
      documents: Array.isArray(data.documents) ? data.documents : [],
      createdAt: now,
      updatedAt: now,
    };
    // insertOne mutates its argument by adding _id; insert a copy so the response stays clean.
    await projectsCollection().insertOne({ ...savedItem });
  }

  return savedItem;
}

export async function reorderStack(orderList) {
  // orderList: array of { id, stackOrder, isPinned }
  const projects = await getAllProjects();
  const now = new Date().toISOString();
  const ops = [];

  for (const item of orderList) {
    const idx = findProjectIndex(projects, item.id);
    if (idx === -1) continue;

    const target = projects[idx];
    const $set = { updatedAt: now };
    if (item.stackOrder !== undefined) $set.stackOrder = Number(item.stackOrder);
    if (item.isPinned !== undefined) $set.isPinned = Boolean(item.isPinned);
    ops.push({ updateOne: { filter: { id: target.id }, update: { $set } } });
  }

  if (ops.length > 0) {
    await projectsCollection().bulkWrite(ops);
  }

  return getAllProjects();
}

export async function deleteProject(id) {
  const projects = await getAllProjects();
  const existingIndex = findProjectIndex(projects, id);

  if (existingIndex === -1) {
    return false;
  }

  const [removed] = projects.splice(existingIndex, 1);
  await projectsCollection().deleteOne({ id: removed.id });

  // Recalculate stack order sequentially for pinned items
  let pinnedIndex = 0;
  const ops = projects.map((p) => ({
    updateOne: {
      filter: { id: p.id },
      update: { $set: { stackOrder: p.isPinned !== false ? pinnedIndex++ : 999 } },
    },
  }));

  if (ops.length > 0) {
    await projectsCollection().bulkWrite(ops);
  }

  return true;
}
