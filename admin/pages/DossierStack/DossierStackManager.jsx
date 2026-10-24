import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Pin,
  PinOff,
  Save,
  ExternalLink,
  Check,
  Eye,
  AlertCircle,
  Sparkles,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useProjects } from '../../../src/context/ProjectsContext';
import { AdminButton } from '../../components/common/AdminButton';
import { S3Uploader } from '../../components/media/S3Uploader';

export const DossierStackManager = () => {
  const [items, setItems] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Hover image management state
  const [hoverImageDraft, setHoverImageDraft] = useState('');
  const [savingHover, setSavingHover] = useState(false);
  const [hoverSaveSuccess, setHoverSaveSuccess] = useState(false);
  const [previewHover, setPreviewHover] = useState(false);
  const { refreshProjects } = useProjects();

  useEffect(() => {
    async function fetchList() {
      try {
        const list = await projectService.getAll();
        setItems(list);
        if (list.length > 0) {
          setSelectedCardId(list[0].id);
        }
      } catch (err) {
        setError('Failed to load project list: ' + err.message);
      }
    }
    fetchList();
  }, []);

  const pinnedItems = items
    .filter((p) => p.isPinned !== false)
    .sort((a, b) => (a.stackOrder ?? 0) - (b.stackOrder ?? 0));

  const unpinnedItems = items.filter((p) => p.isPinned === false);

  const handleMove = (index, direction) => {
    // direction: -1 (up) or 1 (down)
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= pinnedItems.length) return;

    const reorderedPinned = [...pinnedItems];
    const temp = reorderedPinned[index];
    reorderedPinned[index] = reorderedPinned[targetIndex];
    reorderedPinned[targetIndex] = temp;

    // Re-assign stackOrder
    reorderedPinned.forEach((p, idx) => {
      p.stackOrder = idx;
    });

    // Merge back with unpinned
    const updatedAll = [...reorderedPinned, ...unpinnedItems];
    setItems(updatedAll);
    setSaveSuccess(false);
  };

  const handleTogglePin = (id) => {
    const updatedAll = items.map((p) => {
      if (p.id === id) {
        const nextPinned = p.isPinned === false;
        return {
          ...p,
          isPinned: nextPinned,
          stackOrder: nextPinned ? pinnedItems.length : 999,
        };
      }
      return p;
    });

    // Recalculate pinned orders
    const nowPinned = updatedAll
      .filter((p) => p.isPinned !== false)
      .sort((a, b) => (a.stackOrder ?? 0) - (b.stackOrder ?? 0));
    nowPinned.forEach((p, idx) => {
      p.stackOrder = idx;
    });

    setItems(updatedAll);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const payload = items.map((p) => ({
        id: p.id,
        stackOrder: p.stackOrder,
        isPinned: p.isPinned !== false,
      }));

      await projectService.reorderStack(payload);
      await refreshProjects();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to persist stack order');
    } finally {
      setIsSaving(false);
    }
  };

  const selectedCard = items.find((p) => p.id === selectedCardId) || items[0];

  useEffect(() => {
    if (selectedCard) {
      setHoverImageDraft(selectedCard.hoverImage || '');
      setHoverSaveSuccess(false);
    }
  }, [selectedCard?.id, selectedCard?.hoverImage]);

  const fallbackGal = selectedCard?.galleryImages?.[0];
  const galleryDefault = typeof fallbackGal === 'string' ? fallbackGal : fallbackGal?.url;
  const effectiveHoverImage = hoverImageDraft || selectedCard?.hoverImage || galleryDefault;

  const handleSaveHoverImage = async () => {
    if (!selectedCard) return;
    setSavingHover(true);
    setHoverSaveSuccess(false);
    try {
      await projectService.update(selectedCard.id, {
        ...selectedCard,
        hoverImage: hoverImageDraft,
      });
      setItems((prev) =>
        prev.map((item) => (item.id === selectedCard.id ? { ...item, hoverImage: hoverImageDraft } : item))
      );
      await refreshProjects();
      setHoverSaveSuccess(true);
      setTimeout(() => setHoverSaveSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save hover image: ' + err.message);
    } finally {
      setSavingHover(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[#d4af37]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37]">
              ARCHIVE CURATION ENGINE
            </span>
          </div>
          <h1 className="font-serif text-3xl text-white font-normal">
            Pinned Dossier Stack Manager
          </h1>
          <p className="font-sans text-xs text-white/50 max-w-2xl mt-1">
            Curate the sequence and presence of cards displayed on the{' '}
            <code className="text-[#d4af37]">/archive</code> pinned GSAP 3D card viewport.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/archive"
            target="_blank"
            className="px-4 py-2.5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>Preview /archive</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
          </Link>

          <AdminButton
            variant="primary"
            icon={isSaving ? undefined : saveSuccess ? Check : Save}
            loading={isSaving}
            onClick={handleSave}
          >
            {saveSuccess ? 'Stack Saved' : 'Save Stack Order'}
          </AdminButton>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#241212] border border-[#ff6b6b]/40 text-[#ff6b6b] text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="p-4 bg-[#0f2415] border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Pinned Dossier Stack updated successfully! Changes are live on /archive.</span>
        </div>
      )}

      {/* Main Staging Grid: Left = Stack Reorder List; Right = Live Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stack Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Pinned Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                ACTIVE PINNED DECK ({pinnedItems.length} CARDS)
              </span>
              <span className="font-mono text-[10px] text-[#d4af37]">
                Top to bottom = GSAP 3D reveal order
              </span>
            </div>

            <div className="space-y-2">
              {pinnedItems.map((project, idx) => {
                const isSelected = project.id === selectedCardId;

                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedCardId(project.id)}
                    className={`p-4 bg-[#141416] border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#1a1a1d] shadow-lg shadow-[#d4af37]/5'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Step Number */}
                      <span className="font-mono text-sm font-semibold text-[#d4af37] w-8">
                        0{idx + 1}
                      </span>

                      {/* Thumbnail */}
                      <div className="w-14 h-10 bg-black/60 overflow-hidden flex-shrink-0 border border-white/5">
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title & Location */}
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm text-white font-medium truncate">
                          {project.title}
                        </h4>
                        <span className="font-mono text-[10px] text-white/50 block truncate">
                          {project.location} • {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Actions: Move Up, Move Down, Unpin */}
                    <div
                      className="flex items-center gap-1.5 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        className="p-1.5 bg-[#1c1c1f] text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors border border-white/5 cursor-pointer"
                        title="Move Earlier in Deck"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        disabled={idx === pinnedItems.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="p-1.5 bg-[#1c1c1f] text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-colors border border-white/5 cursor-pointer"
                        title="Move Later in Deck"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTogglePin(project.id)}
                        className="p-1.5 bg-[#1c1c1f] text-[#d4af37] hover:text-[#ff6b6b] hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
                        title="Unpin from Dossier Stack"
                      >
                        <PinOff className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unpinned Catalog Section */}
          {unpinnedItems.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                UNPINNED WORKS ({unpinnedItems.length})
              </span>

              <div className="space-y-2">
                {unpinnedItems.map((project) => (
                  <div
                    key={project.id}
                    className="p-3 bg-[#111113] border border-white/5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-8 bg-black/60 overflow-hidden flex-shrink-0">
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale opacity-50"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-xs text-white/70 truncate">
                          {project.title}
                        </h4>
                        <span className="font-mono text-[9px] text-white/40 block truncate">
                          {project.location}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTogglePin(project.id)}
                      className="px-2.5 py-1 bg-white/5 hover:bg-[#d4af37]/10 text-white/60 hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/30 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Pin className="w-3 h-3" />
                      <span>Pin to Stack</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Card Simulation & Hover Image Management */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>LIVE CARD PREVIEW (/archive)</span>
              </span>
              {selectedCard && (
                <Link
                  to={`/admin/projects/${selectedCard.id}`}
                  className="font-mono text-xs text-white/60 hover:text-[#d4af37] underline"
                >
                  Edit Complete Project
                </Link>
              )}
            </div>

            {selectedCard ? (
              <div className="p-6 bg-[#0c0c0c] border border-white/20 shadow-2xl space-y-5 relative overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                    01 // {selectedCard.category}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 bg-white/5 border border-white/15 text-[#d4af37]">
                    {selectedCard.status}
                  </span>
                </div>

                {/* Card Hero Image Frame with Hover Simulation */}
                <div
                  className="h-48 bg-black/60 overflow-hidden relative border border-white/10 cursor-pointer group select-none"
                  onMouseEnter={() => setPreviewHover(true)}
                  onMouseLeave={() => setPreviewHover(false)}
                >
                  {/* Primary Hero Image */}
                  <img
                    src={selectedCard.heroImage}
                    alt={selectedCard.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      previewHover && effectiveHoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />

                  {/* Secondary Preview Plate on Hover */}
                  {effectiveHoverImage && (
                    <img
                      src={effectiveHoverImage}
                      alt={`${selectedCard.title} Secondary Hover`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        previewHover ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                      }`}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/90 via-[#0c0c0c]/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-wider block">
                      📍 {selectedCard.location}
                    </span>
                    <h3 className="font-serif text-xl text-white font-normal mt-0.5">
                      {selectedCard.title}
                    </h3>
                  </div>

                  {/* Interactive Simulation Status Chip */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#0c0c0c]/80 backdrop-blur-md border border-white/15 text-[9px] font-mono tracking-widest text-[#d4af37] pointer-events-none uppercase">
                    {previewHover && effectiveHoverImage ? 'Secondary Plate Active' : 'Hover to Test Crossfade'}
                  </div>
                </div>

                {/* Summary */}
                <p className="font-sans text-xs text-white/70 leading-relaxed">
                  {selectedCard.summary}
                </p>

                {/* Metrics preview */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  {(selectedCard.metrics || []).slice(0, 4).map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">
                        {m.label}
                      </span>
                      <span className="font-serif text-xs text-[#d4af37] font-medium block">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/40 uppercase">
                    DOSSIER #{selectedCard.id}
                  </span>
                  <span className="font-mono text-[10px] text-[#d4af37] flex items-center gap-1 uppercase tracking-wider">
                    Inspect Architectural File →
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-[#141416] border border-white/10 text-center text-white/40 text-xs font-mono">
                Select a card to preview
              </div>
            )}
          </div>

          {/* Hover Image Configuration Panel for Selected Card */}
          {selectedCard && (
            <div className="p-6 bg-[#141416] border border-[#d4af37]/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Hover Secondary Image</span>
                  </span>
                  <p className="font-sans text-[11px] text-white/50 mt-0.5">
                    Displayed during card hover on <code className="text-[#d4af37]">/archive</code>.
                  </p>
                </div>
                {selectedCard.hoverImage && (
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 uppercase">
                    Custom Assigned
                  </span>
                )}
              </div>

              {/* Quick Pick from Project Gallery */}
              {Array.isArray(selectedCard.galleryImages) && selectedCard.galleryImages.length > 0 && (
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider block">
                    Quick Pick From Project Gallery:
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {selectedCard.galleryImages.map((gItem, gIdx) => {
                      const gUrl = typeof gItem === 'string' ? gItem : gItem?.url;
                      const isChosen = hoverImageDraft === gUrl;

                      return (
                        <button
                          key={gIdx}
                          type="button"
                          onClick={() => setHoverImageDraft(gUrl)}
                          className={`relative h-14 bg-black/60 overflow-hidden border transition-all cursor-pointer group/thumb ${
                            isChosen
                              ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                              : 'border-white/10 hover:border-white/40'
                          }`}
                          title={`Select plate 0${gIdx + 1}`}
                        >
                          <img
                            src={gUrl}
                            alt={`Gallery ${gIdx}`}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                          />
                          {isChosen && (
                            <div className="absolute inset-0 bg-[#d4af37]/30 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white drop-shadow" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* S3 / Local Disk Uploader */}
              <div className="pt-2">
                <S3Uploader
                  label="Upload / Custom Image URL"
                  value={hoverImageDraft}
                  onChange={(url) => setHoverImageDraft(url)}
                  helperText="Upload a new high-resolution photo or paste an asset URL."
                />
              </div>

              {/* Action Buttons & Status */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                {hoverImageDraft && (
                  <button
                    type="button"
                    onClick={() => setHoverImageDraft('')}
                    className="font-mono text-[10px] text-white/50 hover:text-white flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset To Gallery Default</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  {hoverSaveSuccess && (
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                  <AdminButton
                    variant="primary"
                    size="sm"
                    loading={savingHover}
                    onClick={handleSaveHoverImage}
                    disabled={savingHover}
                  >
                    Save Hover Image
                  </AdminButton>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
