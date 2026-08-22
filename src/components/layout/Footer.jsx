import React from 'react';

export const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-[#1A1A1A] text-[#F9F8F6] py-24 md:py-32 px-8 md:px-16 mt-32 relative z-10 overflow-hidden border-t border-[#1A1A1A]">
      {/* Massive Watermark Typography */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden opacity-[0.04] z-0" aria-hidden="true">
        <span className="font-serif font-bold text-[22vw] leading-[0.7] whitespace-nowrap text-[#F9F8F6]">
          SKY SQUARE
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Column: Brand Vision */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                The Heritage
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-normal leading-[1.05] mb-8 text-[#F9F8F6]">
              Built for <span className="italic text-[#D4AF37]">Generations.</span>
            </h2>
            <p className="text-[#EBE5DE]/80 font-sans max-w-md text-base md:text-lg leading-relaxed font-light">
              We bridge the gap between visionary planning and grounded reality across the Telangana growth corridors.
            </p>
          </div>

          <div className="mt-12 md:mt-24 pt-8 border-t border-[#F9F8F6]/10 flex flex-wrap gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-[#EBE5DE]/60">
            <span>RERA Registered</span>
            <span>•</span>
            <span>Telangana Govt Contractor</span>
            <span>•</span>
            <span>ISO Compliant Standards</span>
          </div>
        </div>

        {/* Middle Column: Offices */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-8 font-medium">
            Offices &amp; Studio
          </h4>
          <address className="not-italic font-sans text-[#EBE5DE]/85 leading-loose text-sm font-light">
            <strong className="font-serif text-base block text-[#F9F8F6] mb-2 font-normal">Sky Square Infra Head Office</strong>
            Pillar no -213, Attapur<br />
            Hyderabad, Telangana<br />
            India — 500048
          </address>

          <div className="mt-8 pt-6 border-t border-[#F9F8F6]/10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#EBE5DE]/60 block mb-1">Operating Hours</span>
            <p className="text-xs text-[#EBE5DE]/85 font-sans">Mon – Sat: 09:30 AM – 07:00 PM IST</p>
          </div>
        </div>

        {/* Right Column: Connect & Socials */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-8 font-medium">
            Direct Inquiries
          </h4>
          <ul className="flex flex-col gap-4 font-sans text-sm text-[#EBE5DE]/85 font-light">
            <li>
              <a 
                href="mailto:info@skysquareinfra.com" 
                className="hover:text-[#D4AF37] transition-colors duration-500 flex items-center gap-2 group"
              >
                <span className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span>info@skysquareinfra.com</span>
              </a>
            </li>
            <li>
              <a 
                href="tel:+919553299745" 
                className="hover:text-[#D4AF37] transition-colors duration-500 flex items-center gap-2 group"
              >
                <span className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span>+91 95532 99745</span>
              </a>
            </li>
            
            {/* Social Icons & WhatsApp */}
            <li className="mt-6 flex items-center gap-4 pt-6 border-t border-[#F9F8F6]/10">
              <a
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                href="https://www.instagram.com/skysquare_infra?igsh=MThmdTF0ZnJlcW01eg=="
                className="flex items-center justify-center w-12 h-12 border border-[#F9F8F6]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-500 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#F9F8F6] group-hover:text-[#D4AF37] transition-colors duration-500 group-hover:scale-110">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Direct Consultation"
                href="https://wa.me/919553299745?text=Hi%20Sky%20Square%20Infra%20Team!%20I%20am%20interested%20in%20a%20project%20consultation."
                className="flex items-center justify-center w-12 h-12 border border-[#F9F8F6]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-500 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-[#F9F8F6] group-hover:text-[#D4AF37] transition-colors duration-500 group-hover:scale-110">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Full-width Copyright Bar */}
        <div className="col-span-12 mt-12 md:mt-20 pt-8 border-t border-[#F9F8F6]/10 flex flex-col sm:flex-row justify-between items-center gap-4 font-sans text-xs uppercase tracking-[0.25em] text-[#EBE5DE]/40">
          <div>
            © {new Date().getFullYear()} Sky Square Infra. All rights reserved.
          </div>
          <div className="flex gap-6 text-[10px]">
            <span>Architecture</span>
            <span>•</span>
            <span>Land Development</span>
            <span>•</span>
            <span>Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
