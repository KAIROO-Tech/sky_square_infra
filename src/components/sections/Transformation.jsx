import React, { useState, useRef } from 'react';
import { Compass, DraftingCompass, Building, Award, CheckCircle2 } from 'lucide-react';

const stages = [
  {
    number: "01",
    title: "Raw Land",
    subtitle: "ACQUISITION & CORRIDOR SELECTION",
    description: "We strategically select raw acreage across Telangana's primary growth corridors. Conducting rigorous geotechnical surveys, contour analysis, and geodetic verification ensures a clear foundation with 100% legal title assurance.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
    icon: Compass,
    metrics: [
      { label: "Growth Corridor", value: "Prime Telangana" },
      { label: "Due Diligence", value: "100% Clear Title" },
      { label: "Surveys Conducted", value: "Contour & Geotechnical" }
    ]
  },
  {
    number: "02",
    title: "Planning & Vision",
    subtitle: "MASTER DESIGN & BLUEPRINTS",
    description: "Transforming acreage into master-planned residential and commercial environments. We design layouts that optimize solar orientation, incorporate sustainable water harvesting, and integrate durable subterranean utility conduits.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop",
    icon: DraftingCompass,
    metrics: [
      { label: "Layout Standard", value: "RERA Guidelines" },
      { label: "Drainage Grid", value: "Optimized Stormwater" },
      { label: "Design Core", value: "Passive Solar Orientation" }
    ]
  },
  {
    number: "03",
    title: "Engineering Rigor",
    subtitle: "INFRASTRUCTURE & CONSTRUCTION",
    description: "Building with absolute precision. We execute high-grade Proctor density soil compaction, lay steel-reinforced M30 concrete road structures, and establish subterranean power and optic fiber networks under zero-margin tolerances.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15c3?q=80&w=2000&auto=format&fit=crop",
    icon: Building,
    metrics: [
      { label: "Soil Compaction", value: "98% Proctor Density" },
      { label: "Road Infrastructure", value: "M30 Reinforced Concrete" },
      { label: "Tolerance Standard", value: "Zero-Margin Quality" }
    ]
  },
  {
    number: "04",
    title: "Finished Place",
    subtitle: "ARCHITECTURAL HANDOVER & VALUE",
    description: "Delivering living, breathing, generational landmarks. From luxury gated villa enclaves to state-grade civic connectivity infrastructure, our finished developments appreciate continuously while setting new aesthetic benchmarks.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    icon: Award,
    metrics: [
      { label: "Gated Security", value: "Smart Boundary Grid" },
      { label: "Civic Compliance", value: "100% Telangana Govt Approved" },
      { label: "Handover Target", value: "On-Time Key Release" }
    ]
  }
];

export const Transformation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const handleTabClick = (index) => {
    setActiveStep(index);
  };

  return (
    <section 
      ref={containerRef}
      id="transformation"
      className="dark-scrim-container relative w-full bg-[#0d0f11] text-white py-24 md:py-32 px-6 lg:px-16 overflow-hidden border-t border-white/10"
    >
      {/* Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs uppercase tracking-[0.3em] font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
              Signature Methodology
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium tracking-tight">
              The Evolution of Land
            </h2>
          </div>
          <p className="text-white/60 text-sm md:text-base max-w-md font-light leading-relaxed">
            From uncharted acreage to engineered generational landmarks across prime Telangana corridors.
          </p>
        </div>

        {/* 2-Column Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Architectural Zoom-Wipe Visual Frame */}
          <div className="lg:col-span-6 relative h-[360px] md:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            {stages.map((stage, idx) => (
              <div
                key={`img-${stage.number}`}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  activeStep === idx 
                    ? 'opacity-100 scale-105 z-10 pointer-events-auto' 
                    : 'opacity-0 scale-100 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover transform transition-transform duration-1000 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Visual Metadata Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono tracking-widest text-white/80">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    STAGE {stage.number} OF 04
                  </span>
                  <span className="text-[#C5A880]">SKY SQUARE INFRA</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Smooth Staggered Vertical Reveal Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between min-h-[400px]">
            <div className="relative min-h-[260px] md:min-h-[240px]">
              {stages.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isActive = activeStep === idx;
                return (
                  <div
                    key={`content-${stage.number}`}
                    className={`transition-all duration-700 ease-in-out ${
                      isActive
                        ? 'opacity-100 translate-y-0 relative z-10 pointer-events-auto block'
                        : 'opacity-0 translate-y-6 absolute inset-0 z-0 pointer-events-none hidden'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-[#C5A880] text-xs font-mono uppercase tracking-[0.25em] mb-3">
                      <IconComponent className="w-4 h-4" />
                      <span>{stage.subtitle}</span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl text-white font-medium mb-4">
                      {stage.title}
                    </h3>

                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8">
                      {stage.description}
                    </p>

                    {/* Staggered Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      {stage.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex flex-col">
                          <span className="text-white/40 text-[11px] uppercase tracking-wider font-mono mb-1">
                            {m.label}
                          </span>
                          <span className="text-white font-medium text-xs md:text-sm">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage Step Tabs */}
            <div className="pt-10 mt-8 border-t border-white/10">
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {stages.map((stage, idx) => {
                  const isCurrent = activeStep === idx;
                  return (
                    <button
                      key={`btn-${stage.number}`}
                      onClick={() => handleTabClick(idx)}
                      className={`group flex flex-col text-left transition-all duration-300 py-3 px-2 md:px-3 rounded-lg border focus:outline-none cursor-pointer ${
                        isCurrent
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-white shadow-md'
                          : 'border-white/5 bg-white/[0.02] text-white/40 hover:text-white/80 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className={`text-xs font-mono font-semibold ${isCurrent ? 'text-[#C5A880]' : 'text-white/40'}`}>
                          {stage.number}
                        </span>
                        {isCurrent && <CheckCircle2 className="w-3 h-3 text-[#C5A880]" />}
                      </div>
                      <span className="text-[11px] md:text-xs font-medium truncate">
                        {stage.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Transformation;
