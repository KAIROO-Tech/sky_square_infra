import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Ethos', to: '/#about', hash: '#about' },
    { label: 'Archive', to: '/archive' },
    { label: 'Expertise', to: '/expertise' },
    { label: 'Connect', to: '/contact' },
  ];

  const handleNavClick = (link, e) => {
    if (link.hash) {
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.querySelector(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleInquireClick = () => {
    navigate('/inquire');
    if (onOpenConsultation) {
      onOpenConsultation();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d0f11]/85 backdrop-blur-md border-b border-white/10 py-4 md:py-5 transition-all duration-500">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand / Monogram */}
        <Link to="/" className="group flex items-center gap-3.5 focus:outline-none cursor-pointer">
          <div className="w-8 h-8 border border-[#C5A880]/60 bg-[#C5A880]/10 flex items-center justify-center font-serif text-sm font-semibold tracking-tighter text-[#C5A880] group-hover:border-[#C5A880] transition-colors duration-300">
            SQ
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base md:text-lg font-bold tracking-tight text-white group-hover:text-[#C5A880] transition-colors duration-300">
              SKY SQUARE <span className="font-mono font-light text-xs tracking-[0.2em] text-[#C5A880] block md:inline md:ml-1 uppercase">Infra</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10 font-mono text-xs uppercase tracking-widest text-white/80 font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={(e) => handleNavClick(link, e)}
                className={`relative py-1 transition-colors duration-300 hover:text-[#C5A880] cursor-pointer ${
                  isActive
                    ? 'text-[#C5A880] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#C5A880]'
                    : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA, Theme Toggle & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Fancy Theme Toggle */}
          <ThemeToggle />

          <div className="hidden sm:block">
            <Button 
              variant="primary" 
              size="small" 
              onClick={handleInquireClick}
              className="bg-[#C5A880] text-[#0d0f11] hover:bg-[#b0926a] font-mono text-xs uppercase tracking-wider"
            >
              Inquire
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-[#C5A880] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f11] border-b border-white/10 px-8 py-8 animate-fadeIn text-white">
          <div className="flex flex-col gap-6 font-mono text-xs uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(link, e);
                }}
                className={`py-2 transition-colors border-b border-white/10 cursor-pointer ${
                  location.pathname === link.to ? 'text-[#C5A880]' : 'text-white/80 hover:text-[#C5A880]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-4">
              <Button 
                variant="primary" 
                size="default" 
                className="w-full bg-[#C5A880] text-[#0d0f11] hover:bg-[#b0926a] font-mono text-xs uppercase tracking-wider"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleInquireClick();
                }}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
