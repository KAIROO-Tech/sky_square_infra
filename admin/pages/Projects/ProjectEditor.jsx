import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Check,
  ExternalLink,
  Layers,
  AlertCircle,
  Eye,
  Sliders,
  Sparkles,
  FileText,
  Image as ImageIcon,
  FolderKanban,
  Trash2,
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useProjects } from '../../../src/context/ProjectsContext';
import { AdminButton } from '../../components/common/AdminButton';
import { AdminInput } from '../../components/common/AdminInput';
import { S3Uploader } from '../../components/media/S3Uploader';
import { GalleryManager } from '../../components/media/GalleryManager';
import { DocumentUploader } from '../../components/media/DocumentUploader';
import { MaterialIconPicker } from '../../components/project/MaterialIconPicker';
import { MilestoneEditor } from '../../components/project/MilestoneEditor';
import { MetricsEditor } from '../../components/project/MetricsEditor';
import { HighlightsEditor } from '../../components/project/HighlightsEditor';

export const ProjectEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { refreshProjects } = useProjects();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    id: '',
    title: '',
    location: '',
    category: 'Land Development',
    status: 'ongoing',
    isBlueprint: false,
    featured: false,
    isPinned: true,
    progressPercent: 0,
    heroImage: '',
    hoverImage: '',
    placeholderGradient: 'linear-gradient(135deg, #1C2321 0%, #0D1B2A 100%)',
    summary: '',
    description: '',
    scope: '',
    pullQuote: '',
    architecturalHighlights: [],
    materialsAndAmenities: [],
    metrics: [],
    milestones: [],
    galleryImages: [],
    beforeImage: '',
    afterImage: '',
    documents: [],
  });

  useEffect(() => {
    if (isNew) return;

    async function loadProject() {
      setLoading(true);
      try {
        const data = await projectService.getById(id);
        if (data) {
          // Normalize before/after if object or string
          const normBefore = typeof data.beforeImage === 'object' ? data.beforeImage?.url || '' : data.beforeImage || '';
          const normAfter = typeof data.afterImage === 'object' ? data.afterImage?.url || '' : data.afterImage || '';

          setForm({
            ...data,
            hoverImage: data.hoverImage || '',
            beforeImage: normBefore,
            afterImage: normAfter,
            architecturalHighlights: data.architecturalHighlights || [],
            materialsAndAmenities: data.materialsAndAmenities || [],
            metrics: data.metrics || [],
            milestones: data.milestones || [],
            galleryImages: data.galleryImages || [],
            documents: data.documents || [],
          });
        }
      } catch (err) {
        setError('Failed to load project: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, isNew]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSavedSuccess(false);
  };

  const handleTitleChange = (val) => {
    setForm((prev) => {
      // Auto-generate slug if new project
      if (isNew && (!prev.id || prev.id === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))) {
        return {
          ...prev,
          title: val,
          id: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        };
      }
      return { ...prev, title: val };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id.trim()) {
      setError('Project slug/ID is required.');
      return;
    }
    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }

    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      if (isNew) {
        await projectService.create(form);
        await refreshProjects();
        setSavedSuccess(true);
        navigate(`/admin/projects/${form.id}`, { replace: true });
      } else {
        await projectService.update(id || form.id, form);
        await refreshProjects();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete "${form.title}"? This cannot be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      await projectService.delete(id || form.id);
      await refreshProjects();
      navigate('/admin/projects', { replace: true });
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-mono text-xs uppercase tracking-widest text-white/50">
          Loading Project Dossier...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* Sticky Header with Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 sticky top-16 bg-[#0e0e10]/95 backdrop-blur-md z-20 py-2">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/projects"
            className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            title="Return to list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block">
              {isNew ? 'CREATE SPECIFICATION' : `CUSTOMIZE SPECIFICATION #${form.id}`}
            </span>
            <h1 className="font-serif text-2xl text-white font-normal truncate max-w-md sm:max-w-xl">
              {form.title || 'Untitled Project Dossier'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <Link
              to={`/archive/${form.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Inspect Public Dossier</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
            </Link>
          )}

          <AdminButton
            type="submit"
            variant="primary"
            loading={saving}
            icon={savedSuccess ? Check : Save}
          >
            {savedSuccess ? 'Dossier Saved' : isNew ? 'Publish Dossier' : 'Save Changes'}
          </AdminButton>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#241212] border border-[#ff6b6b]/40 text-[#ff6b6b] text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {savedSuccess && (
        <div className="p-4 bg-[#0f2415] border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>
            Project dossier saved and published live to{' '}
            <code className="text-white">/archive/{form.id}</code>!
          </span>
        </div>
      )}

      {/* Section 1: Basic Dossier Identity & Routing */}
      <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <FolderKanban className="w-4 h-4 text-[#d4af37]" />
          <h2 className="font-serif text-lg text-white font-normal">
            1. Core Identity &amp; Routing
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AdminInput
            label="Project Title"
            required
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Indus Farm Lands"
          />

          <AdminInput
            label="URL Identifier (Slug)"
            required
            disabled={!isNew}
            helperText={!isNew ? 'Locked after creation to protect URLs' : 'Auto-generated from title'}
            value={form.id}
            onChange={(e) => handleChange('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
            placeholder="e.g. indus-farm-lands"
          />

          <AdminInput
            label="Geographic Location"
            required
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g. Zaheerabad, Telangana"
          />

          <div className="space-y-1.5">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37] block">
              Architectural Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-white focus:border-[#d4af37] outline-none"
            >
              <option value="Land Development">Land Development</option>
              <option value="Construction">Construction</option>
              <option value="Residential Construction">Residential Construction</option>
              <option value="Government Infrastructure">Government Infrastructure</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>

          <AdminInput
            label="Engineering Scope"
            value={form.scope}
            onChange={(e) => handleChange('scope', e.target.value)}
            placeholder="e.g. Turnkey Land Development & Agro-Villa Enclave"
          />

          <div className="space-y-1.5">
            <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37] block">
              Execution Status
            </label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full bg-[#18181b] border border-white/10 px-3.5 py-2.5 font-sans text-xs sm:text-sm text-white focus:border-[#d4af37] outline-none"
            >
              <option value="ongoing">Ongoing Specification</option>
              <option value="completed">Completed Execution</option>
            </select>
          </div>
        </div>

        {/* Toggles: Blueprint, Pinned, Featured */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
          <label className="flex items-center gap-3 p-3 bg-[#18181b] border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isPinned}
              onChange={(e) => handleChange('isPinned', e.target.checked)}
              className="accent-[#d4af37] w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-mono text-xs uppercase text-white block">
                Pin in Dossier Stack
              </span>
              <span className="font-sans text-[10px] text-white/50">
                Visible on /archive 3D deck
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-[#18181b] border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isBlueprint}
              onChange={(e) => handleChange('isBlueprint', e.target.checked)}
              className="accent-[#d4af37] w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-mono text-xs uppercase text-white block">
                Blueprint Styling Mode
              </span>
              <span className="font-sans text-[10px] text-white/50">
                Inverts visuals with technical filter
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-[#18181b] border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="accent-[#d4af37] w-4 h-4 cursor-pointer"
            />
            <div>
              <span className="font-mono text-xs uppercase text-white block">
                Featured Flag
              </span>
              <span className="font-sans text-[10px] text-white/50">
                Elevates placement priority
              </span>
            </div>
          </label>
        </div>
      </section>

      {/* Section 2: Hero Visual Media */}
      <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <ImageIcon className="w-4 h-4 text-[#d4af37]" />
          <h2 className="font-serif text-lg text-white font-normal">
            2. Hero Visual Media &amp; Header
          </h2>
        </div>

        <S3Uploader
          label="Hero Media Header (Image or MP4 Video)"
          helperText="High-resolution banner displayed at the top of /archive/:projectSlug and on the card deck."
          value={form.heroImage}
          onChange={(url) => handleChange('heroImage', url)}
        />

        <S3Uploader
          label="Secondary Hover Preview Plate (Image)"
          helperText="Secondary image revealed when visitors hover over this project card in the Pinned Dossier Stack on /archive. If left empty, the first gallery image is used as fallback."
          value={form.hoverImage}
          onChange={(url) => handleChange('hoverImage', url)}
        />
      </section>

      {/* Section 3: Executive Dossier Text & Ethos */}
      <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <FileText className="w-4 h-4 text-[#d4af37]" />
          <h2 className="font-serif text-lg text-white font-normal">
            3. Executive Dossier Narrative &amp; Philosophy
          </h2>
        </div>

        <AdminInput
          type="textarea"
          rows={3}
          label="Executive Summary (Lead Paragraph)"
          required
          value={form.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="A massive gated community development transforming raw land into a high-value community asset."
        />

        <AdminInput
          type="textarea"
          rows={5}
          label="In-Depth Technical Description"
          required
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Detailed narrative describing master planning, site attributes, structural techniques, and zoning."
        />

        <AdminInput
          type="textarea"
          rows={2}
          label="Architectural Ethos &amp; Philosophy (Pull Quote)"
          value={form.pullQuote}
          onChange={(e) => handleChange('pullQuote', e.target.value)}
          placeholder="True luxury in master-planned land development is not measured in square footage, but in the enduring harmony between human habitat and environmental stewardship."
        />
      </section>

      {/* Section 4: Specifications, Palette & Metrics */}
      <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-8">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <Layers className="w-4 h-4 text-[#d4af37]" />
          <h2 className="font-serif text-lg text-white font-normal">
            4. Specifications, Material Palette &amp; Metrics
          </h2>
        </div>

        <HighlightsEditor
          highlights={form.architecturalHighlights}
          onChange={(list) => handleChange('architecturalHighlights', list)}
        />

        <div className="border-t border-white/5 pt-6">
          <MaterialIconPicker
            items={form.materialsAndAmenities}
            onChange={(items) => handleChange('materialsAndAmenities', items)}
          />
        </div>

        <div className="border-t border-white/5 pt-6">
          <MetricsEditor
            metrics={form.metrics}
            onChange={(metrics) => handleChange('metrics', metrics)}
          />
        </div>
      </section>

      {/* Section 5: Progress & Milestone Checklist (For Ongoing Projects) */}
      {form.status === 'ongoing' && (
        <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#d4af37]" />
              <h2 className="font-serif text-lg text-white font-normal">
                5. Construction Progress &amp; Milestone Schedule
              </h2>
            </div>
            <span className="font-mono text-sm text-[#d4af37] font-semibold">
              {form.progressPercent}% Complete
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-white/60">
              <span>Progress Bar Position</span>
              <span>{form.progressPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={form.progressPercent}
              onChange={(e) => handleChange('progressPercent', Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>

          <MilestoneEditor
            milestones={form.milestones}
            onChange={(milestones) => handleChange('milestones', milestones)}
          />
        </section>
      )}

      {/* Section 6: Before / After Transformation (For Completed Projects) */}
      {form.status === 'completed' && (
        <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <h2 className="font-serif text-lg text-white font-normal">
              6. Before / After Interactive Transformation Slider
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <S3Uploader
              label="Before Transformation Photo"
              helperText="Raw site earthworks, unpaved or initial condition."
              value={form.beforeImage}
              onChange={(url) => handleChange('beforeImage', url)}
            />
            <S3Uploader
              label="After Transformation Photo"
              helperText="Completed civil roadway, villa structure or luxury landscaping."
              value={form.afterImage}
              onChange={(url) => handleChange('afterImage', url)}
            />
          </div>
        </section>
      )}

      {/* Section 7: Visual Documentation Gallery */}
      <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <ImageIcon className="w-4 h-4 text-[#d4af37]" />
          <h2 className="font-serif text-lg text-white font-normal">
            7. Visual Documentation Gallery (Specification Plates)
          </h2>
        </div>

        <GalleryManager
          images={form.galleryImages}
          onChange={(images) => handleChange('galleryImages', images)}
        />
      </section>

      {/* Section 8: Downloadable Technical Blueprints & Dossiers */}
      <section className="p-6 sm:p-8 bg-[#141416] border border-white/10 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <FileText className="w-4 h-4 text-[#d4af37]" />
          <h2 className="font-serif text-lg text-white font-normal">
            8. Downloadable Architectural Blueprints (PDF)
          </h2>
        </div>

        <DocumentUploader
          documents={form.documents}
          onChange={(docs) => handleChange('documents', docs)}
        />
      </section>

      {/* Bottom Save Bar */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <Link
          to="/admin/projects"
          className="font-mono text-xs text-white/50 hover:text-white"
        >
          ← Back to Project Catalogue
        </Link>

        <div className="flex items-center gap-3">
          {!isNew && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteProject}
              className="px-4 py-2.5 bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-500/20 hover:border-red-500/40 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? 'Deleting...' : 'Delete Project'}</span>
            </button>
          )}

          <AdminButton
            type="submit"
            variant="primary"
            loading={saving}
            size="lg"
            icon={savedSuccess ? Check : Save}
          >
            {savedSuccess ? 'Dossier Saved' : isNew ? 'Publish Dossier' : 'Save Changes'}
          </AdminButton>
        </div>
      </div>
    </form>
  );
};
