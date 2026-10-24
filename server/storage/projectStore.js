import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/projects.json');
const FALLBACK_FILE = path.join(__dirname, '../../src/data/projects.js');

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

// Ensure file exists
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

// Keep src/data/projects.js synchronized so static fallback is never stale
async function syncFallbackFile(projects) {
  try {
    const fileContent = `// Auto-synchronized from server/data/projects.json\nexport const projects = ${JSON.stringify(projects, null, 2)};\n`;
    await fs.writeFile(FALLBACK_FILE, fileContent, 'utf8');
  } catch (err) {
    console.warn('Could not sync src/data/projects.js fallback:', err.message);
  }
}

export async function getAllProjects() {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const list = JSON.parse(raw);
    return list.sort((a, b) => (a.stackOrder ?? 0) - (b.stackOrder ?? 0));
  } catch (err) {
    console.error('Error reading projects:', err);
    return [];
  }
}

export async function getProjectById(id) {
  const projects = await getAllProjects();
  const idx = findProjectIndex(projects, id);
  return idx !== -1 ? projects[idx] : null;
}

export async function saveProject(projectData) {
  const projects = await getAllProjects();
  const slug = (projectData.id || projectData.slug || '').trim().toLowerCase();
  
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
      ...projectData,
      id: existing.id || slug,
      hoverImage: projectData.hoverImage !== undefined ? projectData.hoverImage : (existing.hoverImage || ''),
      updatedAt: now,
    };
    projects[existingIndex] = savedItem;
  } else {
    savedItem = {
      id: slug,
      title: projectData.title || 'Untitled Project',
      location: projectData.location || 'Telangana, India',
      category: projectData.category || 'Land Development',
      status: projectData.status || 'ongoing',
      isBlueprint: Boolean(projectData.isBlueprint),
      featured: Boolean(projectData.featured),
      isPinned: projectData.isPinned !== undefined ? Boolean(projectData.isPinned) : true,
      stackOrder: projectData.stackOrder !== undefined ? Number(projectData.stackOrder) : projects.length,
      progressPercent: Number(projectData.progressPercent) || 0,
      milestones: Array.isArray(projectData.milestones) ? projectData.milestones : [],
      heroImage: projectData.heroImage || '',
      hoverImage: projectData.hoverImage || '',
      placeholderGradient: projectData.placeholderGradient || 'linear-gradient(135deg, #1C2321 0%, #0D1B2A 100%)',
      summary: projectData.summary || '',
      description: projectData.description || '',
      scope: projectData.scope || '',
      architecturalHighlights: Array.isArray(projectData.architecturalHighlights) ? projectData.architecturalHighlights : [],
      materialsAndAmenities: Array.isArray(projectData.materialsAndAmenities) ? projectData.materialsAndAmenities : [],
      pullQuote: projectData.pullQuote || '',
      galleryImages: Array.isArray(projectData.galleryImages) ? projectData.galleryImages : [],
      metrics: Array.isArray(projectData.metrics) ? projectData.metrics : [],
      beforeImage: projectData.beforeImage || '',
      afterImage: projectData.afterImage || '',
      documents: Array.isArray(projectData.documents) ? projectData.documents : [],
      createdAt: now,
      updatedAt: now,
    };
    projects.push(savedItem);
  }

  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
  await syncFallbackFile(projects);
  return savedItem;
}

export async function reorderStack(orderList) {
  // orderList: array of { id, stackOrder, isPinned }
  const projects = await getAllProjects();
  const map = new Map(orderList.map((item) => [item.id.toLowerCase(), item]));

  const updated = projects.map((p) => {
    let update = map.get((p.id || '').toLowerCase());
    if (!update) {
      const norm = normalizeSlug(p.id);
      for (const item of orderList) {
        if (normalizeSlug(item.id) === norm) {
          update = item;
          break;
        }
      }
    }

    if (update) {
      return {
        ...p,
        stackOrder: update.stackOrder !== undefined ? Number(update.stackOrder) : p.stackOrder,
        isPinned: update.isPinned !== undefined ? Boolean(update.isPinned) : p.isPinned,
        updatedAt: new Date().toISOString(),
      };
    }
    return p;
  });

  updated.sort((a, b) => (a.stackOrder ?? 0) - (b.stackOrder ?? 0));
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), 'utf8');
  await syncFallbackFile(updated);
  return updated;
}

export async function deleteProject(id) {
  const projects = await getAllProjects();
  const existingIndex = findProjectIndex(projects, id);

  if (existingIndex === -1) {
    return false;
  }

  projects.splice(existingIndex, 1);

  // Recalculate stack order sequentially for pinned items
  let pinnedIndex = 0;
  projects.forEach((p) => {
    if (p.isPinned !== false) {
      p.stackOrder = pinnedIndex++;
    } else {
      p.stackOrder = 999;
    }
  });

  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
  await syncFallbackFile(projects);
  return true;
}
