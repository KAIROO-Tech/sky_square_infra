import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GridLines } from './components/common/GridLines';
import { NoiseOverlay } from './components/common/NoiseOverlay';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SmoothScroll } from './components/common/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home/Home';
import { Archive } from './pages/Archive/Archive';
import { ProjectDetail } from './pages/Archive/ProjectDetail';
import { Expertise } from './pages/Expertise/Expertise';
import { Inquire } from './pages/Inquire/Inquire';

export const App = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#0c0c0c] text-[#f5f5f7] font-sans antialiased overflow-x-hidden selection:bg-[#d4af37] selection:text-[#0c0c0c]">
        {/* Scroll restoration helper */}
        <ScrollToTop />

        {/* Architectural Vertical Gridlines */}
        <GridLines />

        {/* Tactile Noise Texture Overlay */}
        <NoiseOverlay />

        {/* Navigation Header */}
        <Navbar />

        {/* Page Routing */}
        <div className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:projectSlug" element={<ProjectDetail />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/contact" element={<Inquire />} />
            <Route path="/inquire" element={<Inquire />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
