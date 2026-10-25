import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactHeader } from './components/ContactHeader';
import { ContactForm } from './components/ContactForm';
import { ContactMethods } from './components/ContactMethods';
import './Contact.css';

export const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#consultation' || location.state?.scrollToForm) {
      const scrollTimer = setTimeout(() => {
        const targetEl = document.getElementById('consultation') || document.getElementById('consultation-form');
        if (targetEl) {
          const headerOffset = 90;
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

          if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(targetY, { duration: 1.2 });
          } else {
            window.scrollTo({
              top: Math.max(0, targetY),
              behavior: 'smooth'
            });
          }
        }
      }, 100);

      return () => clearTimeout(scrollTimer);
    }
  }, [location.hash, location.state]);
  return (
    <div className="contact-page-container w-full min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] selection:bg-[#d4af37]/30 selection:text-[#d4af37] transition-colors duration-300">
      <ContactHeader />

      <section className="w-full py-12 md:py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Luxury Contact Form with Calendar & Time Dial */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Side: Head Office Info, Phone, Email & WhatsApp Advisory */}
          <div className="lg:col-span-5">
            <ContactMethods />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
