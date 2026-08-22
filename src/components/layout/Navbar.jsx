import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

export const Navbar = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#1A1A1A]/10 py-4 shadow-sm' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 flex items-center justify-between">
        
        {/* Brand / Monogram */}
        <Link to="/" className="group flex items-center gap-4 focus:outline-none">
          <div className="w-8 h-8 border border-[#1A1A1A] flex items-center justify-center font-serif text-sm font-semibold tracking-tighter text-[#1A1A1A] group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors duration-500">
            SQ
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base md:text-lg font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-500">
              SKY SQUARE <span className="font-sans font-light text-xs tracking-[0.2em] text-[#6C6863] block md:inline md:ml-1 uppercase">Infra</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10 font-sans text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/80 font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={(e) => handleNavClick(link, e)}
                className={`relative py-1 transition-colors duration-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#D4AF37] after:transition-all after:duration-500 ${
                  isActive
                    ? 'text-[#D4AF37] after:w-full'
                    : 'hover:text-[#D4AF37] after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Button 
              variant="primary" 
              size="small" 
              onClick={handleInquireClick}
            >
              Inquire
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#D4AF37] transition-colors focus:outline-none"
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
        <div className="lg:hidden bg-[#F9F8F6] border-b border-[#1A1A1A]/10 px-8 py-8 animate-fadeIn">
          <div className="flex flex-col gap-6 font-sans text-xs uppercase tracking-[0.25em]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(link, e);
                }}
                className={`py-2 transition-colors border-b border-[#1A1A1A]/5 ${
                  location.pathname === link.to ? 'text-[#D4AF37]' : 'text-[#1A1A1A] hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button 
                variant="primary" 
                size="default" 
                className="w-full"
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

