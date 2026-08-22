import React from 'react';
import { ContactHeader } from './components/ContactHeader';
import { OfficeCard } from './components/OfficeCard';
import { ContactMethods } from './components/ContactMethods';
import './Contact.css';

export const Contact = () => {
  return (
    <div className="contact-page-container w-full min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
      <ContactHeader />

      <section className="w-full py-20 md:py-28 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <OfficeCard />
          </div>
          <div className="lg:col-span-6">
            <ContactMethods />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
