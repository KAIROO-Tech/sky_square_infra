import React from 'react';

export const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-[var(--color-footer-bg)] text-[var(--color-footer-fg)] py-16 md:py-24 px-8 md:px-16 mt-20 md:mt-28 relative z-10 overflow-hidden border-t border-[var(--color-footer-border)] transition-colors duration-300">
      {/* Subtle Decorative Architectural Watermark */}
      <div className="absolute bottom-6 inset-x-0 flex items-end justify-center pointer-events-none select-none overflow-hidden text-[var(--color-footer-watermark)] z-0" aria-hidden="true">
        <span className="font-serif font-bold text-[13vw] tracking-wider leading-none whitespace-nowrap">
          SKY SQUARE
        </span>
      </div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 relative z-10">
        
        {/* Left Column: Brand Vision & Heritage */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[var(--color-accent)]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
                The Heritage
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-[1.1] mb-6 text-[var(--color-footer-fg)] tracking-tight">
              Built for <span className="italic text-[var(--color-accent)]">Generations.</span>
            </h2>
            <p className="text-[var(--color-footer-muted)] font-sans max-w-lg text-sm sm:text-base leading-relaxed font-light mb-8">
              We bridge the gap between visionary planning and grounded reality across the Telangana growth corridors.
            </p>
          </div>

          <div className="pt-6 border-t border-[var(--color-footer-border)] flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-footer-muted)]">
            <span>RERA Registered</span>
            <span className="text-[var(--color-accent)]">•</span>
            <span>Telangana Govt Contractor</span>
            <span className="text-[var(--color-accent)]">•</span>
            <span>ISO Compliant</span>
          </div>
        </div>

        {/* Middle Column: Offices & Operating Hours */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col justify-between">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-6 font-semibold">
              Offices &amp; Studio
            </h4>
            <address className="not-italic font-sans text-[var(--color-footer-muted)] leading-relaxed text-sm font-light space-y-1 mb-8">
              <strong className="font-serif text-base block text-[var(--color-footer-fg)] mb-2 font-normal">
                Sky Square Infra Head Office
              </strong>
              <p>Pillar no -213, Attapur</p>
              <p>Hyderabad, Telangana</p>
              <p>India — 500048</p>
            </address>
          </div>

          <div className="pt-6 border-t border-[var(--color-footer-border)]">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-footer-muted)] block mb-1">
              Operating Hours
            </span>
            <p className="text-xs sm:text-sm text-[var(--color-footer-fg)] font-sans">
              Mon – Sat: 09:30 AM – 07:00 PM IST
            </p>
          </div>
        </div>

        {/* Right Column: Direct Inquiries & Socials */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col justify-between">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-6 font-semibold">
              Direct Inquiries
            </h4>
            <ul className="flex flex-col gap-3 font-sans text-sm text-[var(--color-footer-muted)] font-light mb-8">
              <li>
                <a 
                  href="mailto:info@skysquareinfra.com" 
                  className="hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
                >
                  <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <span className="text-[var(--color-footer-fg)] hover:text-[var(--color-accent)]">info@skysquareinfra.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919553299745" 
                  className="hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
                >
                  <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <span className="text-[var(--color-footer-fg)] hover:text-[var(--color-accent)]">+91 95532 99745</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-[var(--color-footer-border)] flex items-center gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              href="https://www.instagram.com/skysquare_infra?igsh=MThmdTF0ZnJlcW01eg=="
              className="flex items-center justify-center w-11 h-11 border border-[var(--color-footer-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 text-[var(--color-footer-fg)] hover:text-[var(--color-accent)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 hover:scale-110">
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
              className="flex items-center justify-center w-11 h-11 border border-[var(--color-footer-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 text-[var(--color-footer-fg)] hover:text-[var(--color-accent)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="transition-transform duration-300 hover:scale-110">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </a>
          </div>
        </div>

        {/* Full-width Copyright Bar */}
        <div className="col-span-12 mt-12 md:mt-16 pt-8 border-t border-[var(--color-footer-border)] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-footer-muted)] relative z-10">
          <div>
            © {new Date().getFullYear()} Sky Square Infra. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px]">
            <span>Architecture</span>
            <span className="text-[var(--color-accent)]">•</span>
            <span>Land Development</span>
            <span className="text-[var(--color-accent)]">•</span>
            <span>Infrastructure</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
