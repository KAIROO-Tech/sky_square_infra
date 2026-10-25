import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { Button } from '../../components/common/Button';
import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';
import { 
  FileText,
  Download,
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Maximize2, 
  X, 
  CheckSquare, 
  Square,
  Trees,
  Droplets,
  Droplet,
  ShieldCheck,
  Shield,
  Zap,
  Gem,
  Cpu,
  Sun,
  Waves,
  Compass,
  Box,
  Hammer,
  Sparkles,
  VolumeX,
  CheckCircle2,
  Maximize,
  GitCommit,
  Route,
  Building2,
  ArrowUpDown,
  ShieldAlert,
  Car,
  Quote
} from 'lucide-react';

const iconMap = {
  Trees,
  Droplets,
  Droplet,
  ShieldCheck,
  Shield,
  Zap,
  Gem,
  Cpu,
  Sun,
  Waves,
  Compass,
  Box,
  Hammer,
  Sparkles,
  VolumeX,
  CheckCircle2,
  Maximize,
  GitCommit,
  Route,
  Building2,
  ArrowUpDown,
  ShieldAlert,
  Car,
  Layers
};

export const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const { projects, getProject } = useProjects();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isImgTransitioning, setIsImgTransitioning] = useState(false);
  const isNavigatingRef = useRef(false);
  const thumbnailRefs = useRef([]);

  // Find project using robust matching for slug variations
  const project = getProject(projectSlug);

  const rawGallery = project?.galleryImages || [];
  const galleryImages = useMemo(() => {
    return rawGallery.map((item, idx) => {
      if (typeof item === 'string') {
        return { url: item, caption: `Specification Plate 0${idx + 1}` };
      }
      return {
        url: item.url,
        caption: item.caption || `Specification Plate 0${idx + 1}`
      };
    });
  }, [rawGallery]);

  // Unified circular navigation function used by arrows, thumbnails & keyboard
  const goToImage = useCallback((targetIndex) => {
    if (!galleryImages.length || isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    setIsImgTransitioning(true);

    const safeIndex = (targetIndex + galleryImages.length) % galleryImages.length;
    setLightboxIndex(safeIndex);

    // Smooth transition crossfade & click debounce
    setTimeout(() => {
      setIsImgTransitioning(false);
      isNavigatingRef.current = false;
    }, 220);
  }, [galleryImages.length]);

  const handlePrev = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    goToImage(lightboxIndex - 1);
  }, [goToImage, lightboxIndex]);

  const handleNext = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    goToImage(lightboxIndex + 1);
  }, [goToImage, lightboxIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Keep active thumbnail centered in view when index changes
  useEffect(() => {
    if (lightboxOpen && thumbnailRefs.current[lightboxIndex]) {
      thumbnailRefs.current[lightboxIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [lightboxIndex, lightboxOpen]);

  // Keyboard navigation & body scroll locking for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      // Do not intercept if user is typing in form controls
      const target = e.target;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev(e);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxOpen, handlePrev, handleNext, closeLightbox]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] flex flex-col justify-center items-center px-6 py-24">
        <div className="w-20 h-20 border border-[var(--color-accent)]/40 mb-6 flex items-center justify-center font-serif text-2xl text-[var(--color-accent)]">
          SQ
        </div>
        <h2 className="text-3xl font-serif font-normal mb-4">Project File Not Found</h2>
        <p className="font-sans text-sm text-[var(--color-text-secondary)] max-w-sm text-center leading-relaxed mb-8">
          The requested specification dossier is not registered in our archives.
        </p>
        <Button variant="secondary" onClick={() => navigate('/archive')}>
          Return to Archive
        </Button>
      </div>
    );
  }

  // Calculate pagination
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const activePlate = galleryImages[lightboxIndex] || { url: '', caption: '' };

  return (
    <div className="project-detail-page bg-[var(--color-page-bg)] text-[var(--color-text-primary)] min-h-screen pt-24 pb-12 w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-16">
        
        {/* Top Action Bar: Back Link */}
        <div className="mb-8">
          <Link 
            to="/archive" 
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--color-accent)] transition-transform group-hover:-translate-x-1" />
            <span>Back to Archive</span>
          </Link>
        </div>

        {/* 1. Hero Image Header (Crisp Sizing & Full Bleed Overlay) */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[68vh] bg-[#1A1A1A] border border-[#1A1A1A]/10 overflow-hidden mb-12 sm:mb-16">
          <img
            src={project.heroImage}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105 ${
              project.isBlueprint ? 'invert contrast-125 sepia-[0.3]' : ''
            }`}
          />
          {/* Subtle Darkening Overlay */}
          <div className="absolute inset-0 bg-[#1A1A1A]/20 pointer-events-none" />
          <div className="absolute inset-0 shadow-inner-hairline pointer-events-none z-20" />

          {/* Status Badge overlay */}
          <div className="absolute top-3.5 sm:top-8 right-3.5 sm:right-8 z-20 flex flex-wrap gap-2 sm:gap-3">
            {project.isBlueprint && (
              <span className="backdrop-blur-md bg-[#1A1A1A]/85 border border-[#D4AF37]/60 text-[#D4AF37] px-3 sm:px-3.5 py-1 sm:py-1.5 uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[9px] sm:text-[10px] font-sans">
                Architectural Blueprint
              </span>
            )}
            <span className={`backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 uppercase tracking-[0.2em] text-[9px] sm:text-[10px] font-sans border font-medium ${
              project.status === 'ongoing'
                ? 'bg-[#1A1A1A]/85 border-[#D4AF37]/50 text-[#D4AF37]'
                : 'bg-[#1A1A1A]/85 border-white/30 text-white/90'
            }`}>
              {project.status === 'ongoing' ? 'Ongoing Specification' : 'Completed execution'}
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 md:p-14 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/50 to-transparent z-10">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] block mb-2 font-medium">
              {project.location}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight max-w-4xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* 2. Stats Grid & Specifications (Decoupled Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pb-12 border-b border-[var(--color-border)]">
          
          {/* Left Area: Summary, Blueprint Specs, Material Palette & Pull Quote */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Executive Overview */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[var(--color-accent)]" />
                <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
                  Executive dossier
                </h2>
              </div>
              <p className="font-sans text-lg md:text-xl text-[var(--color-text-primary)] leading-relaxed font-light mb-6">
                {project.summary}
              </p>
              <div className="font-sans text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed font-light space-y-4">
                <p>{project.description}</p>
              </div>
            </div>

            {/* Highlights bullet points */}
            {project.architecturalHighlights && (
              <div className="p-8 bg-[var(--color-surface-warm)] border border-[var(--color-border)] border-t-2 border-t-[var(--color-accent)] shadow-sm">
                <h3 className="font-serif text-lg text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
                  <Layers className="w-5 h-5 text-[var(--color-accent)]" />
                  <span>Key Specifications &amp; Highlights</span>
                </h3>
                <div className="space-y-4">
                  {project.architecturalHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-[var(--color-accent)] text-sm mt-0.5">✦</span>
                      <p className="font-sans text-sm text-[var(--color-text-secondary)] dark:text-[#C5C2BA] leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Material & Amenity Palette Icon Grid */}
            {project.materialsAndAmenities && project.materialsAndAmenities.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-px bg-[var(--color-accent)]" />
                  <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
                    Material &amp; Specification Palette
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.materialsAndAmenities.map((item, idx) => {
                    const IconComp = iconMap[item.icon] || Layers;
                    return (
                      <div 
                        key={idx} 
                        className="p-5 bg-[var(--color-surface)] dark:bg-[#141417] border border-[var(--color-border)] dark:border-white/10 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-warm)] transition-all duration-300 group flex items-start gap-4 shadow-sm"
                      >
                        <div className="p-2.5 bg-[var(--color-surface-warm)] dark:bg-[#1C1C21] text-[var(--color-accent)] border border-[var(--color-border)] dark:border-white/10 flex-shrink-0">
                          <IconComp className="w-4 h-4 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm text-[var(--color-text-primary)] font-medium mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                            {item.label}
                          </h4>
                          <p className="font-sans text-xs text-[var(--color-text-secondary)] dark:text-[#C5C2BA] leading-relaxed font-light">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Editorial Design Philosophy Pull Quote */}
            {project.pullQuote && (
              <div className="p-8 sm:p-10 bg-[var(--color-surface-warm)] dark:bg-[#18181C] border-l-2 border-l-[var(--color-accent)] border border-[var(--color-border)] dark:border-white/10 relative overflow-hidden shadow-sm">
                <div className="absolute top-2 right-4 font-serif text-7xl sm:text-8xl text-[var(--color-text-primary)]/[0.04] select-none pointer-events-none font-bold leading-none">
                  “
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Quote className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
                      Architectural Ethos &amp; Philosophy
                    </span>
                  </div>
                  <blockquote className="font-serif italic text-lg sm:text-xl md:text-2xl text-[var(--color-text-primary)] leading-snug font-normal tracking-tight">
                    “{project.pullQuote}”
                  </blockquote>
                  <div className="pt-2 flex items-center gap-3">
                    <span className="w-4 h-px bg-[var(--color-accent)]/60" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] dark:text-[#A8A49C]">
                      Sky Square Infra Specification Dossier
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Area: Detailed Metadata Grid */}
          <div className="lg:col-span-4 bg-[var(--color-surface)] dark:bg-[#141417] border border-[var(--color-border)] dark:border-white/10 p-8 shadow-card space-y-8">
            <h3 className="font-serif text-lg border-b border-[var(--color-border)] dark:border-white/10 pb-4 text-[var(--color-text-primary)] font-normal">
              Dossier Metadata
            </h3>

            <div className="space-y-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] dark:text-[#A8A49C] block font-medium">
                  Location
                </span>
                <span className="font-serif text-base text-[var(--color-text-primary)] mt-1 block">
                  {project.location}
                </span>
              </div>

              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] dark:text-[#A8A49C] block font-medium">
                  Engineering Scope
                </span>
                <span className="font-serif text-base text-[var(--color-text-primary)] mt-1 block">
                  {project.scope}
                </span>
              </div>

              {/* Dynamic metrics from project */}
              {project.metrics && project.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] dark:text-[#A8A49C] block font-medium">
                    {m.label}
                  </span>
                  <span className="font-serif text-base text-[var(--color-accent)] mt-1 block">
                    {m.value}
                  </span>
                </div>
              ))}

              {/* Live Progress for Ongoing Projects */}
              {project.status === 'ongoing' && project.progressPercent !== undefined && (
                <div className="pt-4 border-t border-[var(--color-border)] dark:border-white/10 space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] dark:text-[#A8A49C] font-medium">
                        Construction Progress
                      </span>
                      <span className="font-mono text-sm font-semibold text-[var(--color-accent)]">
                        {project.progressPercent}%
                      </span>
                    </div>
                    {/* Compact Gold Progress Bar (0px radius) */}
                    <div className="w-full h-1.5 bg-[var(--color-surface-muted)] dark:bg-[#202026] border border-[var(--color-border)] dark:border-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-[var(--color-accent)] transition-all duration-1000 ease-editorial"
                        style={{ width: `${project.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestone Checklist */}
                  {project.milestones && project.milestones.length > 0 && (
                    <div className="pt-2">
                      <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] dark:text-[#A8A49C] block mb-3 font-semibold">
                        Milestone Schedule
                      </span>
                      <div className="space-y-2.5">
                        {project.milestones.map((milestone, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex-shrink-0">
                              {milestone.done ? (
                                <CheckSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                              ) : (
                                <Square className="w-3.5 h-3.5 text-[var(--color-text-muted)]/60 dark:text-white/35" />
                              )}
                            </span>
                            <span className={`font-sans text-xs leading-snug ${
                              milestone.done 
                                ? 'text-[var(--color-text-primary)] dark:text-[#F5F5F7] font-medium' 
                                : 'text-[var(--color-text-secondary)] dark:text-[#A39E95] font-light'
                            }`}>
                              {milestone.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[var(--color-border)] dark:border-white/10">
              <Button 
                variant="primary" 
                className="w-full border border-white/20 hover:border-[#D4AF37]"
                onClick={() => navigate('/inquire', { state: { selectedProject: project } })}
              >
                Inquire For Details
              </Button>
            </div>
          </div>

        </div>

        {/* 3. Before/After Transformation Slider for Completed Projects Only */}
        {project.status === 'completed' && project.beforeImage && project.afterImage && (
          <div className="mb-20">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              projectTitle={project.title}
            />
          </div>
        )}

        {/* 4. Visual Documentation Gallery with Lightbox Interaction */}
        <div className="mb-20">
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Visual Documentation
              </h3>
            </div>
            <span className="font-mono text-xs text-[var(--color-text-muted)] dark:text-[#A8A49C] tracking-widest hidden sm:inline-block">
              {String(galleryImages.length).padStart(2, '0')} SPECIFICATION PLATES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((plate, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => openLightbox(idx)}
                className="relative overflow-hidden h-[280px] sm:h-[320px] bg-[#1A1A1A] border border-[#1A1A1A]/15 group cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                aria-label={`Open specification figure 0${idx + 1}: ${plate.caption} in lightbox`}
              >
                <img
                  src={plate.url}
                  alt={`${project.title} - ${plate.caption}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                />
                
                {/* Hairline + vignette layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 shadow-inner-hairline pointer-events-none" />

                {/* Technical Figure Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#F9F8F6]/90 bg-[#1A1A1A]/85 border border-white/15 px-2.5 py-1 backdrop-blur-sm">
                    FIG. 0{idx + 1}
                  </span>
                </div>

                {/* Hover Caption Overlay (Bottom Left) */}
                <div className="absolute bottom-4 left-4 right-20 z-10">
                  <span className="font-sans text-xs text-white/95 font-medium tracking-wide line-clamp-1 block drop-shadow-sm group-hover:text-[#D4AF37] transition-colors duration-300">
                    {plate.caption}
                  </span>
                </div>

                {/* Hover Inspect Prompt (Bottom Right) */}
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-[#1A1A1A]/95 border border-[#D4AF37]/60 px-2.5 py-1 text-[#D4AF37] text-[10px] font-mono tracking-wider">
                  <Maximize2 className="w-3 h-3" />
                  <span>INSPECT</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Architectural Blueprints & PDF Dossiers */}
        {project.documents && project.documents.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Architectural Blueprints &amp; Technical Dossiers
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.documents.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-warm)] transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[var(--color-surface-warm)] text-[var(--color-accent)] border border-[var(--color-border)]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                        {doc.title || `Architectural Specification Plate 0${idx + 1}`}
                      </h4>
                      {doc.fileSize && (
                        <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase">
                          {doc.fileSize} • PDF Document
                        </span>
                      )}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 5. Consultation Banner CTA */}
        <div className="p-10 bg-[var(--color-surface-warm)] dark:bg-[#18181C] border border-[var(--color-border)] dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 mb-20 shadow-sm">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl text-[var(--color-text-primary)] mb-2 font-normal">
              Interested in structural specs or valuation in Attapur, Shankerpally, or Zaheerabad?
            </h4>
            <p className="font-sans text-xs text-[var(--color-text-secondary)] dark:text-[#B8B4AC] tracking-wider font-light">
              Connect with our advisory director to acquire site blueprints, geodetic surveys or custom quotes.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate('/inquire', { state: { selectedProject: project } })}
          >
            Inquire About Project
          </Button>
        </div>

        {/* 6. Next / Prev Project Navigation */}
        <div className="border-t border-[var(--color-border)] pt-10 flex justify-between items-center text-xs uppercase font-sans tracking-[0.2em] mb-8">
          <Link
            to={`/archive/${prevProject.id}`}
            className="group flex flex-col items-start gap-1 max-w-[45%] text-left"
          >
            <span className="text-[var(--color-text-muted)] dark:text-[#A8A49C] group-hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors">
              <ChevronLeft className="w-4 h-4" /> PREVIOUS SPECIFICATION
            </span>
            <span className="font-serif text-sm font-semibold normal-case text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1 mt-1">
              {prevProject.title}
            </span>
          </Link>

          <Link
            to={`/archive/${nextProject.id}`}
            className="group flex flex-col items-end gap-1 max-w-[45%] text-right"
          >
            <span className="text-[var(--color-text-muted)] dark:text-[#A8A49C] group-hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors">
              NEXT SPECIFICATION <ChevronRight className="w-4 h-4" />
            </span>
            <span className="font-serif text-sm font-semibold normal-case text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1 mt-1">
              {nextProject.title}
            </span>
          </Link>
        </div>

      </div>

      {/* 7. Image Gallery / Visual Specification Drawer */}
      {lightboxOpen && (
        <div 
          className="fixed top-[72px] md:top-[80px] bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-[var(--color-overlay)]/85 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Visual Documentation Lightbox"
          onClick={closeLightbox}
        >
          {/* Gallery / Drawer Container Frame */}
          <div 
            className="relative w-full max-w-7xl h-full max-h-[calc(100vh-88px)] md:max-h-[calc(100vh-104px)] flex flex-col justify-between bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-2xl p-3 sm:p-5 md:p-6 overflow-hidden select-none transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery Drawer Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3.5 w-full z-20 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-[var(--color-accent)]" />
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)] block font-medium">
                    Visual Specification Dossier
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-[var(--color-text-primary)] font-normal line-clamp-1">
                    {project.title} &mdash; <span className="text-[var(--color-text-secondary)] font-sans text-xs">{activePlate.caption}</span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-text-muted)] hidden sm:inline-block">
                  PLATE {String(lightboxIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                </span>
                
                {/* Prominent X Close Button at top-right of gallery drawer container */}
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[var(--color-surface-warm)] hover:bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:text-[#0C0C0E] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] shadow-md"
                  aria-label="Close image gallery"
                  title="Close image gallery"
                >
                  <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase font-semibold">CLOSE</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gallery Main Image Display & Navigation */}
            <div className="relative flex-1 flex items-center justify-center my-2 sm:my-3 w-full overflow-hidden min-h-0">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3.5 bg-[var(--color-surface-warm)]/90 hover:bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:text-[#0C0C0E] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] touch-manipulation active:scale-95 shadow-lg"
                aria-label="Previous gallery image"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Active Image Frame */}
              <div className="relative max-h-[50vh] sm:max-h-[54vh] md:max-h-[58vh] max-w-full flex flex-col items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-1">
                <img
                  key={activePlate.url}
                  src={activePlate.url}
                  alt={`${project.title} - ${activePlate.caption}`}
                  className={`max-h-[46vh] sm:max-h-[50vh] md:max-h-[54vh] w-auto max-w-full object-contain transition-all duration-300 ${
                    isImgTransitioning ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
                  }`}
                />
                <div className="absolute inset-0 shadow-inner-hairline pointer-events-none" />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3.5 bg-[var(--color-surface-warm)]/90 hover:bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:text-[#0C0C0E] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] touch-manipulation active:scale-95 shadow-lg"
                aria-label="Next gallery image"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Gallery Footer Thumbnail Bar */}
            <div className="border-t border-[var(--color-border)] pt-2.5 sm:pt-3 w-full flex items-center justify-center gap-2.5 sm:gap-3 overflow-x-auto py-1.5 z-20 scrollbar-none shrink-0">
              {galleryImages.map((plate, idx) => (
                <button
                  key={idx}
                  ref={(el) => (thumbnailRefs.current[idx] = el)}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToImage(idx);
                  }}
                  className={`relative w-12 h-9 sm:w-16 sm:h-12 md:w-20 md:h-14 flex-shrink-0 overflow-hidden border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] ${
                    idx === lightboxIndex 
                      ? 'border-[var(--color-accent)] opacity-100 ring-2 ring-[var(--color-accent)] scale-105' 
                      : 'border-[var(--color-border)] opacity-50 hover:opacity-90'
                  }`}
                  aria-label={`Jump to plate 0${idx + 1}: ${plate.caption}`}
                  title={`Plate ${idx + 1}: ${plate.caption}`}
                >
                  <img 
                    src={plate.url} 
                    alt={`Thumbnail Plate ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-[var(--color-surface-warm)] text-[8px] font-mono text-[var(--color-accent)] px-1">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectDetail;
