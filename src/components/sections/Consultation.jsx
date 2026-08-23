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
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {});
    } catch {}

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
    <section id="consultation" className="w-full py-24 md:py-32 bg-[#0c0c0c] text-[#f5f5f7] px-6 md:px-16 border-b border-white/10 relative z-10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Heading & Direct Contact */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#d4af37]" />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                PRIVATE ADVISORY // STRUCTURAL DIRECTORS
              </p>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#f5f5f7] leading-[1.05] mb-6 tracking-tight">
              Initiate a <br />
              <span className="italic font-serif text-[#d4af37] font-light">Consultation.</span>
            </h2>

            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed font-light mb-8 max-w-md">
              Whether acquiring expansive land parcels or commissioning turnkey residential builds in Telangana, our engineering team provides structural feasibility and investment clarity.
            </p>

            {/* Quick Contact Box */}
            <div className="theme-office-card p-8 bg-[#111113] border-t-2 border-t-[#d4af37] border border-white/10 rounded-2xl shadow-xl space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
                  Direct Line &amp; WhatsApp
                </span>
                <a href="tel:+919553299745" className="font-serif text-2xl text-[#f5f5f7] hover:text-[#d4af37] transition-colors font-normal">
                  +91 95532 99745
                </a>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
                  Email Desk
                </span>
                <a href="mailto:info@skysquareinfra.com" className="font-serif text-lg text-[#f5f5f7] hover:text-[#d4af37] transition-colors font-normal">
                  info@skysquareinfra.com
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full h-12 flex items-center justify-center gap-3 border border-[#d4af37]/60 hover:border-[#d4af37] hover:bg-[#d4af37]/15 text-xs uppercase tracking-[0.2em] font-mono font-semibold transition-all duration-300 text-[#d4af37] rounded-full"
                >
                  <MessageSquareText className="w-4 h-4 text-[#d4af37]" />
                  <span>Instant WhatsApp Connect</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="theme-form-card lg:col-span-7 bg-[#111113] p-8 sm:p-12 md:p-14 border border-white/10 shadow-2xl rounded-2xl relative">
            
            {isSubmitted ? (
              <div className="py-16 text-center animate-fadeIn">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#d4af37] text-[#d4af37] rounded-full bg-[#d4af37]/10">
                  <CheckCircle2 className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-3xl text-[#f5f5f7] mb-4">
                  Inquiry Received with Distinction
                </h3>
                <p className="font-sans text-sm text-white/70 max-w-md mx-auto leading-relaxed mb-8 font-light">
                  Thank you for reaching out to Sky Square Infra. Our executive engineering director will review your specifications and contact you within 24 business hours.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsSubmitted(false);
                      if (onClearSelectedProject) onClearSelectedProject();
                    }}
                    className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/20"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {selectedProject && (
                  <div className="p-4 bg-[#d4af37]/10 border border-[#d4af37]/50 flex items-center justify-between rounded-lg">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37]">Selected Project:</span>
                      <p className="font-serif text-sm font-medium text-[#f5f5f7]">{selectedProject.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearSelectedProject}
                      className="text-xs font-mono text-white/60 hover:text-white underline"
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
                    placeholder="Full Name"
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

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
                  <span className="font-mono text-[11px] text-white/50">
                    * All architectural consultations remain strictly confidential.
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#d4af37] text-[#0c0c0c] hover:bg-[#c29f2f] font-mono text-xs uppercase tracking-wider font-semibold py-4 px-8 shadow-lg shadow-[#d4af37]/20"
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

export default Consultation;
