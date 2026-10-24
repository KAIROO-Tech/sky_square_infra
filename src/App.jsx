import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { AdminRoutes } from '../admin/routes/AdminRoutes';

export const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="relative min-h-screen bg-[#0c0c0c] text-[#f5f5f7] font-sans antialiased selection:bg-[#d4af37] selection:text-[#0c0c0c]">
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] font-sans antialiased overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-[var(--color-accent-fg)]">
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
