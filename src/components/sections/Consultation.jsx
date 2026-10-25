import React, { useState } from 'react';
import { Input, Textarea, Select } from '../common/Input';
import { Button } from '../common/Button';
import { MessageSquareText } from 'lucide-react';
import { ConsultationConfirmModal } from './ConsultationConfirmModal';

export const Consultation = ({ selectedProject, onClearSelectedProject }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interest: selectedProject ? selectedProject.title : 'Land Development / Plot Acquisition',
    location: '',
    message: selectedProject ? `Inquiring about project specifications for ${selectedProject.title}.` : '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [inquiryRef, setInquiryRef] = useState(null);

  const interestOptions = [
    { value: 'Land Development / Plot Acquisition', label: 'Land Development / Plot Acquisition' },
    { value: 'Turnkey Luxury Villa Construction', label: 'Turnkey Luxury Villa Construction' },
    { value: 'Multi-Storey Residential Investment', label: 'Multi-Storey Residential Investment' },
    { value: 'Government & Civil Infrastructure', label: 'Government & Civil Infrastructure' },
    { value: 'General Feasibility Study / Consultation', label: 'General Feasibility Study / Consultation' },
  ];

  // Specific field validator
  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullName') {
      const trimmed = typeof value === 'string' ? value.trim() : '';
      if (!trimmed) {
        error = 'Please enter your full name.';
      } else if (trimmed.length < 2) {
        error = 'Full name must contain at least 2 characters.';
      }
    } else if (name === 'phone') {
      const trimmed = typeof value === 'string' ? value.trim() : '';
      const digits = trimmed.replace(/\D/g, '');
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,16}$/;
      if (!trimmed) {
        error = 'Please enter your contact phone number.';
      } else if (!phoneRegex.test(trimmed) || digits.length < 7 || digits.length > 15) {
        error = 'Please provide a valid phone number (including optional country code).';
      }
    } else if (name === 'email') {
      const trimmed = typeof value === 'string' ? value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!trimmed) {
        error = 'Please enter your email address.';
      } else if (!emailRegex.test(trimmed)) {
        error = 'Please enter a valid email address (e.g. client@domain.com).';
      }
    } else if (name === 'interest') {
      const trimmed = typeof value === 'string' ? value.trim() : '';
      if (!trimmed) {
        error = 'Please select an area of engagement.';
      }
    }
    return error;
  };

  // Validate all required fields
  const validateAll = (data) => {
    const newErrors = {};
    ['fullName', 'phone', 'email', 'interest'].forEach((field) => {
      const err = validateField(field, data[field]);
      if (err) newErrors[field] = err;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove or update error dynamically as the user corrects the field
    if (errors[name]) {
      const fieldErr = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (!fieldErr) delete next[name];
        else next[name] = fieldErr;
        return next;
      });
    }
  };

  // Triggered on Dispatch Consultation Request click
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateAll(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus the first invalid field
      const firstInvalidField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstInvalidField);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsModalOpen(true);
  };

  // Triggered only after user confirms in the modal
  const handleConfirmSend = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setInquiryRef(data.inquiryRef || `INQ-${Date.now().toString().slice(-6)}`);
        setSubmitSuccess(true);
      } else {
        const errorMessage =
          data.error ||
          'Our dispatch server could not deliver the email to the consultation desk. Please retry or contact us directly.';
        setSubmitError(errorMessage);
      }
    } catch {
      setSubmitError('Unable to connect to the consultation dispatch server. Please check your network and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Called on success close
  const handleResetAndClose = () => {
    setIsModalOpen(false);
    setSubmitSuccess(false);
    setSubmitError(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      interest: 'Land Development / Plot Acquisition',
      location: '',
      message: '',
    });
    setErrors({});
    if (onClearSelectedProject) onClearSelectedProject();
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Sky Square Infra Team,\nMy name is ${formData.fullName || 'Guest'}.\nI am interested in: ${formData.interest}.\nContact: ${formData.phone || 'Not provided'}.\n${formData.message}`
    );
    window.open(`https://wa.me/919553299745?text=${text}`, '_blank');
  };

  return (
    <section id="consultation" className="w-full py-24 md:py-32 bg-[var(--color-page-bg)] text-[var(--color-text-primary)] px-6 md:px-16 border-b border-[var(--color-border)] relative z-10 transition-colors duration-300 scroll-mt-24">
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
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[var(--color-text-primary)] leading-[1.05] mb-6 tracking-tight">
              Initiate a <br />
              <span className="italic font-serif text-[#d4af37] font-light">Consultation.</span>
            </h2>

            <p className="font-sans text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-light mb-8 max-w-md">
              Whether acquiring expansive land parcels or commissioning turnkey residential builds in Telangana, our engineering team provides structural feasibility and investment clarity.
            </p>

            {/* Quick Contact Box */}
            <div className="theme-office-card p-8 bg-[var(--color-surface)] border-t-2 border-t-[#d4af37] border border-[var(--color-border)] rounded-2xl shadow-xl space-y-6 transition-colors duration-300">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
                  Direct Line &amp; WhatsApp
                </span>
                <a href="tel:+919553299745" className="font-serif text-2xl text-[var(--color-text-primary)] hover:text-[#d4af37] transition-colors font-normal">
                  +91 95532 99745
                </a>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
                  Email Desk
                </span>
                <a href="mailto:info@skysquareinfra.com" className="font-serif text-lg text-[var(--color-text-primary)] hover:text-[#d4af37] transition-colors font-normal">
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
          <div className="theme-form-card lg:col-span-7 bg-[var(--color-surface)] p-8 sm:p-12 md:p-14 border border-[var(--color-border)] shadow-2xl rounded-2xl relative transition-colors duration-300">
            
            <form id="consultation-form" onSubmit={handleSubmit} noValidate className="space-y-8">
              
              {selectedProject && (
                <div className="p-4 bg-[#d4af37]/10 border border-[#d4af37]/50 flex items-center justify-between rounded-lg">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37]">Selected Project:</span>
                    <p className="font-serif text-sm font-medium text-[var(--color-text-primary)]">{selectedProject.title}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClearSelectedProject}
                    className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Input
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  required
                  placeholder="Full Name"
                  value={formData.fullName}
                  error={errors.fullName}
                  onChange={handleChange}
                />
                <Input
                  id="phone"
                  label="Contact Phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  error={errors.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Input
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  placeholder="client@domain.com"
                  value={formData.email}
                  error={errors.email}
                  onChange={handleChange}
                />
                <Input
                  id="location"
                  label="Location of Interest"
                  name="location"
                  placeholder="e.g. Attapur, Shankerpally, Zaheerabad"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <Select
                id="interest"
                label="Area of Engagement"
                name="interest"
                required
                options={interestOptions}
                value={formData.interest}
                error={errors.interest}
                onChange={handleChange}
              />

              <Textarea
                id="message"
                label="Project Scope / Specific Requirements"
                name="message"
                rows={4}
                placeholder="Outline your parcel dimensions, timeline, architectural preferences, or investment criteria..."
                value={formData.message}
                onChange={handleChange}
              />

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[var(--color-border)]">
                <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                  * All architectural consultations remain strictly confidential.
                </span>
                <Button
                  id="dispatch-btn"
                  type="submit"
                  variant="primary"
                  size="large"
                  className="w-full sm:w-auto bg-[#d4af37] text-[#0c0c0c] hover:bg-[#c29f2f] font-mono text-xs uppercase tracking-wider font-semibold py-4 px-8 shadow-lg shadow-[#d4af37]/20"
                >
                  Dispatch Consultation Request
                </Button>
              </div>

            </form>

          </div>

        </div>

      </div>

      {/* Confirmation & Email Delivery Modal */}
      <ConsultationConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSend}
        formData={formData}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
        inquiryRef={inquiryRef}
        onResetAndClose={handleResetAndClose}
      />
    </section>
  );
};

export default Consultation;
