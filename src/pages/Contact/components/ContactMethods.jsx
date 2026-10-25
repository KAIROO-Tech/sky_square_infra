import React from 'react';
import { Phone, Mail, MessageSquareText, ArrowRight } from 'lucide-react';
import { OfficeCard } from './OfficeCard';
import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const ContactMethods = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open('https://wa.me/919553299745?text=Hi%20Sky%20Square%20Infra%20Team!%20I%20am%20reaching%20out%20for%20a%20consultation.', '_blank');
  };

  const handleFillForm = () => {
    const el = document.getElementById('consultation');
    if (el) {
      const headerOffset = 90;
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(targetY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
      setTimeout(() => {
        const input = document.getElementById('name') || el.querySelector('input');
        if (input) input.focus();
      }, 500);
    } else {
      navigate('/inquire');
    }
  };

  return (
    <div className="space-y-6">
      {/* Sky Square Infra Head Office details */}
      <OfficeCard />

      {/* Direct Phone Line */}
      <div className="theme-office-card p-6 sm:p-8 bg-[var(--color-surface)] border-t-2 border-t-[#d4af37] border border-[var(--color-border)] rounded-2xl shadow-xl transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-5 h-5 text-[#d4af37]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]">Direct Phone Line</span>
        </div>
        <a href="tel:+919553299745" className="font-serif text-2xl sm:text-3xl text-[var(--color-text-primary)] hover:text-[#d4af37] transition-colors block mb-2 font-normal">
          +91 95532 99745
        </a>
        <p className="font-sans text-xs text-[var(--color-text-secondary)] font-light">Instant executive response during office hours</p>
      </div>

      {/* Official Email Desk */}
      <div className="theme-office-card p-6 sm:p-8 bg-[var(--color-surface)] border-t-2 border-t-[#d4af37] border border-[var(--color-border)] rounded-2xl shadow-xl transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-[#d4af37]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]">Official Email Desk</span>
        </div>
        <a href="mailto:info@skysquareinfra.com" className="font-serif text-lg sm:text-xl md:text-2xl break-all sm:break-normal text-[var(--color-text-primary)] hover:text-[#d4af37] transition-colors block mb-2 font-normal">
          info@skysquareinfra.com
        </a>
        <p className="font-sans text-xs text-[var(--color-text-secondary)] font-light">Send blueprints, RFPs, or land acquisition queries</p>
      </div>

      {/* WhatsApp Direct Advisory */}
      <div className="p-6 sm:p-8 bg-[var(--color-surface)] border border-[#d4af37]/40 rounded-2xl text-[var(--color-text-primary)] space-y-6 shadow-2xl transition-colors duration-300">
        <div className="flex items-center gap-3">
          <MessageSquareText className="w-5 h-5 text-[#d4af37]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">WhatsApp Direct Advisory</span>
        </div>
        <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
          Connect immediately on WhatsApp to speak with our engineering director regarding active site visits or structural estimations.
        </p>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full h-12 flex items-center justify-center gap-3 border border-[#d4af37]/60 hover:border-[#d4af37] hover:bg-[#d4af37]/15 text-xs uppercase tracking-[0.2em] font-mono transition-all duration-300 text-[#d4af37] rounded-full font-semibold cursor-pointer"
        >
          <span>Open WhatsApp Chat</span>
          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </button>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          size="large"
          className="w-full justify-center bg-[#d4af37] text-[#0c0c0c] hover:bg-[#c29f2f] font-mono text-xs uppercase tracking-wider font-semibold py-4 cursor-pointer shadow-md"
          onClick={handleFillForm}
        >
          Fill Structured Advisory Form
        </Button>
      </div>
    </div>
  );
};

export default ContactMethods;
