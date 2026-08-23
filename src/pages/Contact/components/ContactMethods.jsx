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
      <div className="p-8 bg-[#EBE5DE]/40 border-t-2 border-t-[#1A1A1A] border border-[#1A1A1A]/10">
        <div className="flex items-center gap-3 mb-6">
          <Phone className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#6C6863]">Direct Phone Line</span>
        </div>
        <a href="tel:+919553299745" className="font-serif text-3xl text-[#1A1A1A] hover:text-[#D4AF37] transition-colors block mb-2">
          +91 95532 99745
        </a>
        <p className="font-sans text-xs text-[#6C6863]">Instant executive response during office hours</p>
      </div>

      {/* Official Email Desk */}
      <div className="p-8 bg-[#EBE5DE]/40 border-t-2 border-t-[#1A1A1A] border border-[#1A1A1A]/10">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#6C6863]">Official Email Desk</span>
        </div>
        <a href="mailto:info@skysquareinfra.com" className="font-serif text-2xl text-[#1A1A1A] hover:text-[#D4AF37] transition-colors block mb-2">
          info@skysquareinfra.com
        </a>
        <p className="font-sans text-xs text-[#6C6863]">Send blueprints, RFPs, or land acquisition queries</p>
      </div>

      {/* WhatsApp Direct Advisory */}
      <div className="p-8 bg-[#1A1A1A] text-[#F9F8F6] space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquareText className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4AF37]">WhatsApp Direct Advisory</span>
        </div>
        <p className="font-sans text-sm text-[#EBE5DE]/80 leading-relaxed font-light">
          Connect immediately on WhatsApp to speak with our engineering director regarding active site visits or structural estimations.
        </p>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full h-12 flex items-center justify-center gap-3 border border-[#F9F8F6]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-500 text-[#F9F8F6]"
        >
          <span>Open WhatsApp Chat</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          size="large"
          className="w-full justify-center"
          onClick={() => navigate('/inquire')}
        >
          Fill Structured Advisory Form
        </Button>
      </div>
    </div>
  );
};

