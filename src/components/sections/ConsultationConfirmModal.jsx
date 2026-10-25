import React, { useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { Button } from '../common/Button';

export const ConsultationConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  formData,
  isSubmitting,
  submitError,
  submitSuccess,
  inquiryRef,
  onResetAndClose,
}) => {
  const modalRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Keyboard navigation, focus trap & escape key handler
  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus initial element
    const timer = setTimeout(() => {
      if (primaryBtnRef.current) {
        primaryBtnRef.current.focus();
      } else if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (!isSubmitting) {
          if (submitSuccess) {
            onResetAndClose();
          } else {
            onClose();
          }
        }
      }

      // Focus trap within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitting, submitSuccess, onClose, onResetAndClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
    >
      {/* Backdrop with luxury blur */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => {
          if (!isSubmitting) {
            if (submitSuccess) onResetAndClose();
            else onClose();
          }
        }}
        aria-hidden="true"
      />

      {/* Modal Surface Window */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 z-10 transition-all duration-300 transform scale-100 opacity-100 my-8 max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Top Close Button (disabled while transmitting) */}
        {!isSubmitting && (
          <button
            ref={closeBtnRef}
            type="button"
            onClick={submitSuccess ? onResetAndClose : onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUCCESS STATE */}
        {/* ------------------------------------------------------------- */}
        {submitSuccess ? (
          <div className="py-4 text-center animate-fadeIn">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#d4af37] text-[#d4af37] rounded-full bg-[#d4af37]/10">
              <CheckCircle2 className="w-8 h-8 text-[#d4af37]" />
            </div>

            <div className="inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
              DISPATCH CONFIRMED // {inquiryRef || 'VERIFIED'}
            </div>

            <h3 id="confirm-modal-title" className="font-serif text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-3">
              Consultation Request Dispatched
            </h3>

            <p id="confirm-modal-desc" className="font-sans text-sm text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed mb-6 font-light">
              Thank you, <strong className="text-[var(--color-text-primary)] font-medium">{formData.fullName}</strong>. Your consultation details have been officially transmitted to our executive directors. You will receive an advisory response within 24 business hours.
            </p>

            <div className="p-4 bg-[var(--color-surface-warm)] border border-[var(--color-border)] rounded-xl text-left text-xs space-y-2 mb-8 font-mono">
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Inquiry Reference:</span>
                <span className="text-[var(--color-accent)] font-semibold">{inquiryRef || 'INQ-REGISTERED'}</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Direct Reply Destination:</span>
                <span className="text-[var(--color-text-primary)]">{formData.email}</span>
              </div>
            </div>

            <Button
              ref={primaryBtnRef}
              variant="primary"
              size="large"
              onClick={onResetAndClose}
              className="w-full bg-[#d4af37] text-[#0c0c0c] hover:bg-[#c29f2f] font-mono text-xs uppercase tracking-wider font-semibold py-4"
            >
              Close &amp; Return to Page
            </Button>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* REVIEW / CONFIRMATION & ERROR STATES */
          /* ------------------------------------------------------------- */
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-[var(--color-accent)]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
                  OFFICIAL ADVISORY DOSSIER
                </span>
              </div>
              <h3 id="confirm-modal-title" className="font-serif text-2xl sm:text-3xl font-normal text-[var(--color-text-primary)] tracking-tight">
                Confirm Consultation Request
              </h3>
              <p id="confirm-modal-desc" className="font-sans text-xs sm:text-sm text-[var(--color-text-secondary)] font-light mt-1">
                Please verify your entered specifications before transmitting to the Sky Square Infra consultation desk.
              </p>
            </div>

            {/* Error Banner if submission failed */}
            {submitError && (
              <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl flex items-start gap-3 text-left animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans text-xs uppercase tracking-wider font-semibold text-red-700 dark:text-red-400">
                    Transmission Notice
                  </h5>
                  <p className="font-sans text-xs text-red-600 dark:text-red-300 mt-0.5 leading-relaxed">
                    {submitError}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1">
                    Your details remain safe below. You can retry immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Summary Specification Dossier */}
            <div className="bg-[var(--color-surface-warm)] border border-[var(--color-border)] rounded-xl p-5 space-y-4 text-left divide-y divide-[var(--color-border)]">
              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Full Name
                  </span>
                  <span className="block font-sans text-sm font-medium text-[var(--color-text-primary)] mt-0.5">
                    {formData.fullName || '—'}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Contact Phone
                  </span>
                  <span className="block font-sans text-sm font-medium text-[var(--color-text-primary)] mt-0.5">
                    {formData.phone || '—'}
                  </span>
                </div>
              </div>

              {/* Email & Area of Engagement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Email Address (Reply-To)
                  </span>
                  <span className="block font-sans text-sm font-medium text-[var(--color-text-primary)] mt-0.5 break-all">
                    {formData.email || '—'}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    Area of Engagement
                  </span>
                  <span className="block font-sans text-sm font-medium text-[var(--color-accent)] mt-0.5">
                    {formData.interest || 'General Consultation'}
                  </span>
                </div>
              </div>

              {/* Location of Interest */}
              <div className="py-4">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  Location of Interest
                </span>
                <span className="block font-sans text-sm font-light text-[var(--color-text-primary)] mt-0.5">
                  {formData.location?.trim() ? formData.location : 'Not provided'}
                </span>
              </div>

              {/* Project Scope / Requirements */}
              <div className="pt-4">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  Project Scope / Requirements
                </span>
                <p className="font-sans text-xs sm:text-sm font-light text-[var(--color-text-secondary)] mt-1 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                  {formData.message?.trim() ? formData.message : 'Not provided'}
                </p>
              </div>
            </div>

            {/* Privacy & Protocol Note */}
            <p className="font-mono text-[10px] text-[var(--color-text-muted)] text-left">
              ✦ By confirming, your consultation specifications are securely dispatched to the executive director inbox with direct Reply-To configuration.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3.5 border border-[var(--color-border)] hover:border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-mono text-xs uppercase tracking-widest font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Review Details
              </button>

              <button
                ref={primaryBtnRef}
                type="button"
                onClick={onConfirm}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#d4af37] text-[#0c0c0c] hover:bg-[#c29f2f] font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md shadow-[#d4af37]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0c0c0c]" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <span>Yes, Send Request</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationConfirmModal;
