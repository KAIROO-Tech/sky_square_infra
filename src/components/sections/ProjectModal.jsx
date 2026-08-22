import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const ProjectModal = ({ project, onClose, onInquire }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#1A1A1A]/80 backdrop-blur-md animate-fadeIn">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dossier Card (Strict 0px radius, 1px borders) */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#F9F8F6] text-[#1A1A1A] border border-[#1A1A1A] shadow-hero z-10">
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-[#F9F8F6] border-b border-[#1A1A1A]/15 px-8 py-5 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D4AF37]" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#6C6863]">
              Architectural Dossier / Ref. {project.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1A1A1A] hover:text-[#D4AF37] transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 sm:p-12 md:p-16">
          
          {/* Top Title & Metadata */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1A1A1A]/10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                  {project.category}
                </span>
                <span className="text-[#1A1A1A]/30">•</span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#6C6863]">
                  {project.location}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
                {project.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6C6863]">
                Status:
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-widest font-sans border ${
                project.status === 'ongoing' 
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                  : 'border-[#1A1A1A] text-[#1A1A1A] bg-[#1A1A1A]/5'
              }`}>
                <span className={`w-1.5 h-1.5 ${project.status === 'ongoing' ? 'bg-[#D4AF37]' : 'bg-[#1A1A1A]'}`} />
                {project.status}
              </span>
            </div>
          </div>

          {/* Large Visual Section */}
          <div className="my-10 relative h-72 sm:h-96 md:h-[420px] overflow-hidden bg-[#1A1A1A] border border-[#1A1A1A]/20">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {project.isBlueprint && (
              <div className="absolute top-4 right-4 bg-[#1A1A1A]/90 text-[#D4AF37] border border-[#D4AF37]/50 px-4 py-2 text-[10px] uppercase font-sans tracking-[0.25em]">
                Architectural Blueprint Master
              </div>
            )}
          </div>

          {/* Narrative & Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4">
            
            <div className="md:col-span-7">
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
                Project Overview &amp; Specifications
              </h3>
              <p className="font-sans text-base text-[#6C6863] leading-relaxed font-light mb-8">
                {project.description}
              </p>

              <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-4">
                Architectural &amp; Structural Highlights
              </h4>
              <ul className="space-y-3 font-sans text-sm text-[#1A1A1A]/85">
                {project.architecturalHighlights?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Key Technical Metrics */}
            <div className="md:col-span-5 bg-[#EBE5DE]/30 p-8 border-t-2 border-t-[#D4AF37] border border-[#1A1A1A]/10">
              <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-[#1A1A1A] font-semibold mb-6">
                Technical Data Sheet
              </h4>

              <div className="space-y-6">
                <div>
                  <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863] mb-1">
                    Scope of Work
                  </span>
                  <span className="font-serif text-lg text-[#1A1A1A]">
                    {project.scope}
                  </span>
                </div>

                <div className="border-t border-[#1A1A1A]/10 pt-4 space-y-4">
                  {project.metrics?.map((metric, i) => (
                    <div key={i} className="flex justify-between items-center text-sm font-sans">
                      <span className="text-[#6C6863] uppercase tracking-[0.15em] text-xs">
                        {metric.label}
                      </span>
                      <span className="font-serif font-medium text-[#1A1A1A]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1A1A1A]/15">
                <Button
                  variant="primary"
                  size="default"
                  className="w-full"
                  onClick={() => {
                    onClose();
                    if (onInquire) onInquire(project);
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Inquire For This Asset
                </Button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
