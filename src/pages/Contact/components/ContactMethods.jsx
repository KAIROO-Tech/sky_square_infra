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

  return (
    <div className="space-y-6">
      {/* Sky Square Infra Head Office details */}
      <OfficeCard />

      {/* Direct Phone Line */}
      <div className="theme-office-card p-8 bg-[#111113] border-t-2 border-t-[#d4af37] border border-white/10 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-5 h-5 text-[#d4af37]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]">Direct Phone Line</span>
        </div>
        <a href="tel:+919553299745" className="font-serif text-3xl text-[#f5f5f7] hover:text-[#d4af37] transition-colors block mb-2 font-normal">
          +91 95532 99745
        </a>
        <p className="font-sans text-xs text-white/60 font-light">Instant executive response during office hours</p>
      </div>

      {/* Official Email Desk */}
      <div className="theme-office-card p-8 bg-[#111113] border-t-2 border-t-[#d4af37] border border-white/10 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-[#d4af37]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]">Official Email Desk</span>
        </div>
        <a href="mailto:info@skysquareinfra.com" className="font-serif text-2xl text-[#f5f5f7] hover:text-[#d4af37] transition-colors block mb-2 font-normal">
          info@skysquareinfra.com
        </a>
        <p className="font-sans text-xs text-white/60 font-light">Send blueprints, RFPs, or land acquisition queries</p>
      </div>

      {/* WhatsApp Direct Advisory */}
      <div className="p-8 bg-[#111113] border border-[#d4af37]/40 rounded-2xl text-[#f5f5f7] space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <MessageSquareText className="w-5 h-5 text-[#d4af37]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">WhatsApp Direct Advisory</span>
        </div>
        <p className="font-sans text-sm text-white/80 leading-relaxed font-light">
          Connect immediately on WhatsApp to speak with our engineering director regarding active site visits or structural estimations.
        </p>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full h-12 flex items-center justify-center gap-3 border border-[#d4af37]/60 hover:border-[#d4af37] hover:bg-[#d4af37]/15 text-xs uppercase tracking-[0.2em] font-mono transition-all duration-300 text-[#d4af37] rounded-full font-semibold"
        >
          <span>Open WhatsApp Chat</span>
          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </button>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          size="large"
          className="w-full justify-center bg-[#d4af37] text-[#0c0c0c] hover:bg-[#c29f2f] font-mono text-xs uppercase tracking-wider font-semibold py-4"
          onClick={() => navigate('/inquire')}
        >
          Fill Structured Advisory Form
        </Button>
      </div>
    </div>
  );
};

export default ContactMethods;
