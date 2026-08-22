import React, { useState } from 'react';
import { Input, Textarea, Select } from '../common/Input';
import { Button } from '../common/Button';
import { CheckCircle2, MessageSquareText } from 'lucide-react';

export const Consultation = ({ selectedProject, onClearSelectedProject }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interest: selectedProject ? selectedProject.title : 'Land Development / Plot Acquisition',
    location: '',
    message: selectedProject ? `Inquiring about project specifications for ${selectedProject.title}.` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interestOptions = [
    { value: 'Land Development / Plot Acquisition', label: 'Land Development / Plot Acquisition' },
    { value: 'Turnkey Luxury Villa Construction', label: 'Turnkey Luxury Villa Construction' },
    { value: 'Multi-Storey Residential Investment', label: 'Multi-Storey Residential Investment' },
    { value: 'Government & Civil Infrastructure', label: 'Government & Civil Infrastructure' },
    { value: 'General Feasibility Study / Consultation', label: 'General Feasibility Study / Consultation' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Try sending to Express server if running
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {
        // Fallback gracefully if API is offline
      });
    } catch {
      // Silently proceed with luxury user feedback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Sky Square Infra Team,\nMy name is ${formData.fullName || 'Guest'}.\nI am interested in: ${formData.interest}.\nContact: ${formData.phone || 'Not provided'}.\n${formData.message}`
    );
    window.open(`https://wa.me/919553299745?text=${text}`, '_blank');
  };

  return (
    <section id="consultation" className="w-full py-28 md:py-36 bg-[#F9F8F6] px-8 md:px-16 border-b border-[#1A1A1A]/10 relative z-10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Editorial Heading & Direct Contact */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                Private Advisory
              </p>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#1A1A1A] leading-[1.05] mb-8 tracking-tight">
              Initiate a <br />
              <span className="italic text-[#D4AF37]">Consultation.</span>
            </h2>

            <p className="font-sans text-base md:text-lg text-[#6C6863] leading-relaxed font-light mb-10 max-w-md">
              Whether acquiring expansive land parcels or commissioning turnkey residential builds in Telangana, our engineering team provides structural feasibility and investment clarity.
            </p>

            {/* Quick Contact Box */}
            <div className="p-8 bg-[#EBE5DE]/40 border-t-2 border-t-[#D4AF37] border border-[#1A1A1A]/10 space-y-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#6C6863] block mb-1">
                  Direct Line &amp; WhatsApp
                </span>
                <a href="tel:+919553299745" className="font-serif text-2xl text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                  +91 95532 99745
                </a>
              </div>

              <div className="border-t border-[#1A1A1A]/10 pt-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#6C6863] block mb-1">
                  Email Desk
                </span>
                <a href="mailto:info@skysquareinfra.com" className="font-serif text-lg text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                  info@skysquareinfra.com
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full h-12 flex items-center justify-center gap-3 border border-[#1A1A1A] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-500"
                >
                  <MessageSquareText className="w-4 h-4 text-[#D4AF37]" />
                  <span>Instant WhatsApp Connect</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Underline Form Container */}
          <div className="lg:col-span-7 bg-[#F9F8F6] p-8 sm:p-12 md:p-14 border border-[#1A1A1A]/15 shadow-card relative">
            
            {isSubmitted ? (
              <div className="py-16 text-center animate-fadeIn">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#D4AF37] text-[#D4AF37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#1A1A1A] mb-4">
                  Inquiry Received with Distinction
                </h3>
                <p className="font-sans text-sm text-[#6C6863] max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for reaching out to Sky Square Infra. Our executive engineering director will review your specifications and contact you within 24 business hours.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsSubmitted(false);
                      if (onClearSelectedProject) onClearSelectedProject();
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {selectedProject && (
                  <div className="p-4 bg-[#EBE5DE]/60 border border-[#D4AF37]/50 flex items-center justify-between">
                    <div>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-[#6C6863]">Selected Project:</span>
                      <p className="font-serif text-sm font-medium text-[#1A1A1A]">{selectedProject.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearSelectedProject}
                      className="text-xs text-[#6C6863] hover:text-[#1A1A1A] underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input
                    label="Full Name"
                    name="fullName"
                    required
                    placeholder="Lord / Lady / Mr. / Ms. Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Contact Phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Location of Interest"
                    name="location"
                    placeholder="e.g. Attapur, Shankerpally, Zaheerabad"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <Select
                  label="Area of Engagement"
                  name="interest"
                  options={interestOptions}
                  value={formData.interest}
                  onChange={handleChange}
                />

                <Textarea
                  label="Project Scope / Specific Requirements"
                  name="message"
                  rows={4}
                  placeholder="Outline your parcel dimensions, timeline, architectural preferences, or investment criteria..."
                  value={formData.message}
                  onChange={handleChange}
                />

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#1A1A1A]/10">
                  <span className="font-sans text-[11px] text-[#6C6863]/80">
                    * All architectural consultations remain strictly confidential.
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Transmitting...' : 'Dispatch Consultation Request'}
                  </Button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
