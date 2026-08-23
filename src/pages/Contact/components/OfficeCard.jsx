import React from 'react';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';

export const OfficeCard = () => {
  return (
    <div className="theme-office-card bg-[#111113] border-t-2 border-t-[#d4af37] p-8 md:p-12 border border-white/10 shadow-2xl rounded-2xl">
      <h3 className="font-serif text-3xl text-[#f5f5f7] mb-4">
        Sky Square Infra Head Office
      </h3>
      <p className="font-sans text-sm text-white/70 leading-relaxed mb-8 font-light">
        Primary executive office handling government tender coordination, client consultations, land title verification, and architectural blueprints.
      </p>

      <div className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex items-start gap-4">
          <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
          <address className="not-italic font-sans text-sm text-[#f5f5f7] leading-relaxed">
            Pillar no -213, Attapur<br />
            Hyderabad, Telangana<br />
            India — 500048
          </address>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
          <div className="font-sans text-sm text-[#f5f5f7]">
            <span className="font-semibold text-[#d4af37]">Operating Hours:</span>
            <p className="text-white/60 text-xs mt-1 font-mono">Monday – Saturday: 09:30 AM – 07:00 PM IST</p>
          </div>
        </div>

        <div className="flex items-start gap-4 pt-4 border-t border-white/10">
          <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
          <div className="font-mono text-xs text-white/60 uppercase tracking-[0.15em] space-y-1">
            <p>• RERA Registered Infrastructure Firm</p>
            <p>• Telangana Govt Class 1 Contractor</p>
            <p>• ISO Compliant Engineering Standards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;
