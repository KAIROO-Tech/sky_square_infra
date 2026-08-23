import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { Button } from '../../components/common/Button';
import { ArrowLeft, ChevronLeft, ChevronRight, ShieldCheck, Info, MapPin, Grid, Layers } from 'lucide-react';

const getGalleryImages = (category) => {
  const galleries = {
    'Land Development': [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop'
    ],
    'Construction': [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop'
    ],
    'Residential Construction': [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop'
    ],
    'Government Infrastructure': [
      'https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1200&auto=format&fit=crop'
    ]
  };
  return galleries[category] || galleries['Construction'];
};

export const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const navigate = useNavigate();

  // Find project using robust matching for slug variations
  const project = projects.find((p) => {
    const id = p.id.toLowerCase();
    const slug = projectSlug.toLowerCase();
    if (id === slug) return true;
    
    // Normalize IDs and Slugs to match 4800-sft-duplex-villa -> 4800-duplex-villa
    const normId = id.replace('-sft', '').replace('-project', '');
    const normSlug = slug.replace('-sft', '').replace('-project', '');
    return normId === normSlug;
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col justify-center items-center px-6 py-24">
        <div className="w-20 h-20 border border-[#D4AF37]/40 mb-6 flex items-center justify-center font-serif text-2xl text-[#D4AF37]">
          SQ
        </div>
        <h2 className="text-3xl font-serif font-normal mb-4">Project File Not Found</h2>
        <p className="font-sans text-sm text-[#6C6863] max-w-sm text-center leading-relaxed mb-8">
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

  const galleryImages = getGalleryImages(project.category);

  return (
    <div className="project-detail-page bg-[#F9F8F6] text-[#1A1A1A] min-h-screen pt-24 pb-12 w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-16">
        
        {/* Back Link */}
        <Link 
          to="/archive" 
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-[#6C6863] hover:text-[#1A1A1A] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Back to Archive</span>
        </Link>

        {/* 1. Hero Image Header */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-[#1A1A1A] border border-[#1A1A1A]/10 overflow-hidden mb-16">
          <img
            src={project.heroImage}
            alt={project.title}
            className={`w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms] ${
              project.isBlueprint ? 'invert contrast-125 sepia-[0.3]' : ''
            }`}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Subtle Darkening Overlay */}
          <div className="absolute inset-0 bg-[#1A1A1A]/20 pointer-events-none" />
          <div className="absolute inset-0 shadow-inner-hairline pointer-events-none z-20" />

          {/* Status Badge overlay */}
          <div className="absolute top-8 right-8 z-20 flex gap-3">
            {project.isBlueprint && (
              <span className="backdrop-blur-md bg-[#1A1A1A]/80 border border-[#D4AF37]/60 text-[#D4AF37] px-4 py-1.5 uppercase tracking-[0.25em] text-[10px] font-sans">
                Architectural Blueprint
              </span>
            )}
            <span className={`backdrop-blur-md px-4 py-1.5 uppercase tracking-[0.2em] text-[10px] font-sans border font-medium ${
              project.status === 'ongoing'
                ? 'bg-[#1A1A1A]/80 border-[#D4AF37]/50 text-[#D4AF37]'
                : 'bg-[#1A1A1A]/80 border-white/30 text-white/90'
            }`}>
              {project.status === 'ongoing' ? 'Ongoing Specification' : 'Completed execution'}
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 md:p-16 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent z-10">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] block mb-2 font-medium">
              {project.location}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-none max-w-4xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* 2. Stats Grid & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pb-12 border-b border-[#1A1A1A]/10">
          
          {/* Left Area: Summary & Blueprint Specs */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#D4AF37]" />
                <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Executive dossier
                </h2>
              </div>
              <p className="font-sans text-lg md:text-xl text-[#1A1A1A] leading-relaxed font-light mb-8">
                {project.summary}
              </p>
              <div className="font-sans text-sm md:text-base text-[#6C6863] leading-relaxed font-light space-y-6">
                <p>{project.description}</p>
              </div>
            </div>

            {/* Highlights bullet points */}
            {project.architecturalHighlights && (
              <div className="p-8 bg-[#EBE5DE]/30 border border-[#1A1A1A]/10 border-t-2 border-t-[#D4AF37]">
                <h3 className="font-serif text-lg text-[#1A1A1A] mb-6 flex items-center gap-3">
                  <Layers className="w-5 h-5 text-[#D4AF37]" />
                  <span>Key Specifications & Highlights</span>
                </h3>
                <div className="space-y-4">
                  {project.architecturalHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-[#D4AF37] text-sm mt-0.5">✦</span>
                      <p className="font-sans text-sm text-[#6C6863] leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Area: Detailed Metadata Grid */}
          <div className="lg:col-span-4 bg-[#F9F8F6] border border-[#1A1A1A]/15 p-8 shadow-card space-y-8">
            <h3 className="font-serif text-lg border-b border-[#1A1A1A]/10 pb-4 text-[#1A1A1A] font-normal">
              Dossier Metadata
            </h3>

            <div className="space-y-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863] block">
                  Location
                </span>
                <span className="font-serif text-base text-[#1A1A1A] mt-1 block">
                  {project.location}
                </span>
              </div>

              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863] block">
                  Engineering Scope
                </span>
                <span className="font-serif text-base text-[#1A1A1A] mt-1 block">
                  {project.scope}
                </span>
              </div>

              {/* Dynamic metrics from project */}
              {project.metrics && project.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863] block">
                    {m.label}
                  </span>
                  <span className="font-serif text-base text-[#D4AF37] mt-1 block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#1A1A1A]/10">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => navigate('/inquire', { state: { selectedProject: project } })}
              >
                Inquire For Details
              </Button>
            </div>
          </div>

        </div>

        {/* 3. Narrative Image Gallery */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Visual Documentation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((imgUrl, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden h-[300px] bg-[#1A1A1A] border border-[#1A1A1A]/10 group"
              >
                <img
                  src={imgUrl}
                  alt={`Sky Square Project Detail Gallery ${idx + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 shadow-inner-hairline pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Consultation Banner CTA */}
        <div className="p-10 bg-[#EBE5DE]/40 border border-[#1A1A1A]/10 flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] mb-2 font-normal">
              Interested in structural specs or valuation in Attapur, Shankerpally, or Zaheerabad?
            </h4>
            <p className="font-sans text-xs text-[#6C6863] tracking-wider font-light">
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

        {/* 5. Next / Prev Project Navigation */}
        <div className="border-t border-[#1A1A1A]/10 pt-10 flex justify-between items-center text-xs uppercase font-sans tracking-[0.2em] mb-8">
          <Link
            to={`/archive/${prevProject.id}`}
            className="group flex flex-col items-start gap-1 max-w-[45%] text-left"
          >
            <span className="text-[#6C6863]/60 group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
              <ChevronLeft className="w-4 h-4" /> PREVIOUS SPECIFICATION
            </span>
            <span className="font-serif text-sm font-semibold normal-case text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors line-clamp-1 mt-1">
              {prevProject.title}
            </span>
          </Link>

          <Link
            to={`/archive/${nextProject.id}`}
            className="group flex flex-col items-end gap-1 max-w-[45%] text-right"
          >
            <span className="text-[#6C6863]/60 group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
              NEXT SPECIFICATION <ChevronRight className="w-4 h-4" />
            </span>
            <span className="font-serif text-sm font-semibold normal-case text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors line-clamp-1 mt-1">
              {nextProject.title}
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
