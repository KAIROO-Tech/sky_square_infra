import React from 'react';
import { ContactHeader } from './components/ContactHeader';
import { ContactForm } from './components/ContactForm';
import { ContactMethods } from './components/ContactMethods';
import './Contact.css';

export const Contact = () => {
  return (
    <div className="contact-page-container w-full min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
      <ContactHeader />

      <section className="w-full py-16 md:py-24 px-6 sm:px-8 md:px-16">
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

