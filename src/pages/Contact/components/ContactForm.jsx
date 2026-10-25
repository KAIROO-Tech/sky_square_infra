import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: null,
    timeSlot: '10:00 AM',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState(null);

  // Calendar State
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
  ];

  // Helper functions for calendar calculation
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) {
      return; // Cannot navigate to past months
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPastDate = (day) => {
    const checkDate = new Date(currentYear, currentMonth, day);
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return checkDate < todayZero;
  };

  const handleDateSelect = (day) => {
    if (isPastDate(day)) return;
    const selected = new Date(currentYear, currentMonth, day);
    setFormData((prev) => ({ ...prev, date: selected }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: '' }));
    }
  };

  const validatePhone = (phoneStr) => {
    const cleaned = phoneStr.replace(/\D/g, '');
    if (!cleaned) return 'Phone number is required';
    if (cleaned.length !== 10) return 'Phone number must be exactly 10 digits';
    if (!['6', '7', '8', '9'].includes(cleaned[0])) {
      return 'Please enter a valid Indian mobile number starting with 6-9';
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: val }));

    if (errors.phone) {
      const err = validatePhone(val);
      setErrors((prev) => ({ ...prev, phone: err }));
    }
  };

  const handlePhoneBlur = () => {
    const err = validatePhone(formData.phone);
    setErrors((prev) => ({ ...prev, phone: err }));
  };

  const formattedSelectedDate = formData.date
    ? formData.date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      newErrors.name = 'Full Name is required (minimum 2 characters)';
    }

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      newErrors.phone = phoneErr;
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a preferred consultation date from the calendar';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a preferred time slot';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: trimmedName,
        phone: formData.phone.trim(),
        email: trimmedEmail,
        preferredDate: formattedSelectedDate,
        preferredTime: formData.timeSlot,
        interest: 'Scheduled Site Consultation & Advisory',
        message: `Client requested site consultation session for ${formattedSelectedDate} during ${formData.timeSlot} IST window.`,
      };

      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setInquiryRef(data.inquiryRef || `INQ-${Date.now().toString().slice(-6)}`);
        setIsSubmitted(true);
      } else {
        const errorMsg =
          data.error ||
          'Our dispatch server could not deliver the consultation request. Please retry or contact our desk directly.';
        setSubmitError(errorMsg);
      }
    } catch {
      setSubmitError('Unable to connect to the consultation dispatch server. Please check your network and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2 &&
      d1.getMonth() === currentMonth &&
      d1.getFullYear() === currentYear
    );
  };

  if (isSubmitted) {
    return (
      <div className="theme-form-card bg-[var(--color-surface)] border-t-2 border-t-[#d4af37] border border-[var(--color-border)] p-8 md:p-12 shadow-2xl rounded-2xl text-center transition-colors duration-300">
        <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mx-auto mb-6 border border-[#d4af37]/30">
          <CheckCircle2 className="w-10 h-10 text-[#d4af37]" />
        </div>
        <h3 className="font-serif text-3xl text-[var(--color-text-primary)] mb-3">
          Advisory Session Requested
        </h3>
        <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-md mx-auto mb-8 font-light">
          Thank you, <span className="font-medium text-[#d4af37]">{formData.name}</span>. We have received your consultation appointment request for <span className="font-medium text-[var(--color-text-primary)]">{formattedSelectedDate}</span> at <span className="font-medium text-[#d4af37]">{formData.timeSlot}</span>. Our executive advisory directors will review the schedule and contact you shortly to confirm your session.
        </p>

        <div className="theme-calendar-wrapper bg-[var(--color-surface-warm)] p-6 border border-[var(--color-border)] text-left text-xs font-mono space-y-3 mb-8 max-w-md mx-auto rounded-xl">
          {inquiryRef && (
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-[var(--color-text-muted)]">Reference ID:</span>
              <span className="font-medium text-[#d4af37]">{inquiryRef}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
            <span className="text-[var(--color-text-muted)]">Phone Contact:</span>
            <span className="font-medium text-[var(--color-text-primary)]">+91 {formData.phone}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
            <span className="text-[var(--color-text-muted)]">Email Desk:</span>
            <span className="font-medium text-[var(--color-text-primary)]">{formData.email}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
            <span className="text-[var(--color-text-muted)]">Requested Date:</span>
            <span className="font-medium text-[var(--color-text-primary)]">{formattedSelectedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Preferred Time Slot:</span>
            <span className="font-medium text-[#d4af37]">{formData.timeSlot} IST</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setSubmitError(null);
            setFormData({
              name: '',
              phone: '',
              email: '',
              date: null,
              timeSlot: '10:00 AM',
            });
          }}
          className="px-8 py-3.5 bg-[#d4af37] text-[#0c0c0c] font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c29f2f] transition-all duration-300 rounded-full cursor-pointer shadow-md"
        >
          Request Another Session
        </button>
      </div>
    );
  }

  return (
    <div
      id="consultation"
      className="theme-form-card bg-[var(--color-surface)] border-t-2 border-t-[#d4af37] border border-[var(--color-border)] p-5 sm:p-8 md:p-10 shadow-2xl rounded-2xl scroll-mt-28 transition-colors duration-300 text-[var(--color-text-primary)]"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#d4af37]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            EXECUTIVE ADVISORY FORM
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text-primary)]">
          Schedule a Consultation
        </h2>
        <p className="font-sans text-xs text-[var(--color-text-secondary)] mt-2 font-light leading-relaxed">
          Provide your details and select your preferred meeting date and time slot with our senior engineering &amp; acquisition directors.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/40 text-red-600 dark:text-red-400 text-xs font-sans rounded-lg flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block mb-0.5">Transmission Notice</span>
            <span>{submitError}</span>
          </div>
        </div>
      )}

      <form id="consultation-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-primary)] font-medium mb-2">
            Full Name <span className="text-[#d4af37]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="name"
              type="text"
              placeholder="e.g. Rahul Verma"
              value={formData.name}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              className={`theme-input w-full bg-[var(--color-surface-warm)] border ${
                errors.name ? 'border-red-500' : 'border-[var(--color-border)] focus:border-[#d4af37]'
              } pl-10 pr-4 py-3 font-sans text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/60 outline-none transition-colors rounded-lg`}
            />
          </div>
          {errors.name && (
            <p className="font-sans text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-primary)] font-medium mb-2">
            Phone Number <span className="text-[#d4af37]">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center gap-1.5 text-[var(--color-text-muted)] font-mono text-xs font-medium border-r border-[var(--color-border)] pr-2">
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>+91</span>
            </div>
            <input
              id="phone"
              type="tel"
              maxLength={10}
              placeholder="98765 43210"
              value={formData.phone}
              disabled={isSubmitting}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              className={`theme-input w-full bg-[var(--color-surface-warm)] border ${
                errors.phone ? 'border-red-500' : 'border-[var(--color-border)] focus:border-[#d4af37]'
              } pl-20 pr-4 py-3 font-sans text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/60 outline-none transition-colors tracking-wide rounded-lg`}
            />
          </div>
          {errors.phone ? (
            <p className="font-sans text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          ) : (
            <p className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1">
              Must be a 10-digit Indian phone number.
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-primary)] font-medium mb-2">
            Email Address <span className="text-[#d4af37]">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="email"
              type="email"
              placeholder="rahul@example.com"
              value={formData.email}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              className={`theme-input w-full bg-[var(--color-surface-warm)] border ${
                errors.email ? 'border-red-500' : 'border-[var(--color-border)] focus:border-[#d4af37]'
              } pl-10 pr-4 py-3 font-sans text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/60 outline-none transition-colors rounded-lg`}
            />
          </div>
          {errors.email && (
            <p className="font-sans text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Premium Calendar Component */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <label className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-primary)] font-medium flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#d4af37]" />
              <span>Select Consultation Date</span> <span className="text-[#d4af37]">*</span>
            </label>
            {formData.date && (
              <span className="font-mono text-xs text-[#d4af37] font-semibold">
                {formattedSelectedDate}
              </span>
            )}
          </div>

          <div className="theme-calendar-wrapper bg-[var(--color-surface-warm)] border border-[var(--color-border)] p-4 rounded-xl shadow-inner transition-colors duration-300">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-3">
              <span className="font-serif text-lg text-[var(--color-text-primary)] font-normal">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={currentYear === today.getFullYear() && currentMonth <= today.getMonth()}
                  className="p-1.5 hover:bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-border)] rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-[var(--color-text-primary)] cursor-pointer"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-border)] rounded transition-colors text-[var(--color-text-primary)] cursor-pointer"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <span key={d} className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                  {d}
                </span>
              ))}
            </div>

            {/* Date Cells */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-9" />;
                }
                const past = isPastDate(day);
                const selected = isSameDay(formData.date, day);

                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    disabled={past || isSubmitting}
                    onClick={() => handleDateSelect(day)}
                    className={`h-9 flex items-center justify-center font-mono text-xs font-medium transition-all duration-200 rounded-md cursor-pointer ${
                      selected
                        ? 'bg-[#d4af37] text-[#0c0c0c] font-bold shadow-md scale-105'
                        : past
                        ? 'text-[var(--color-text-muted)]/30 cursor-not-allowed'
                        : 'text-[var(--color-text-primary)] hover:bg-[#d4af37]/20 hover:text-[#d4af37] border border-transparent'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
          {errors.date && (
            <p className="font-sans text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
            </p>
          )}
        </div>

        {/* Premium Time Dial Selector (10:00 AM - 10:00 PM) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <label className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-primary)] font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span>Time Dial Selector (10:00 AM – 10:00 PM IST)</span>
            </label>
            <span className="font-mono text-xs text-[#d4af37] font-semibold">
              {formData.timeSlot}
            </span>
          </div>

          <div className="theme-calendar-wrapper bg-[var(--color-surface-warm)] border border-[var(--color-border)] p-3 sm:p-4 rounded-xl transition-colors duration-300">
            <p className="font-mono text-[11px] text-[var(--color-text-muted)] mb-3">
              Select your convenient time window:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = formData.timeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                    className={`theme-time-slot py-2 px-2 text-center font-mono text-xs transition-all duration-200 rounded-md cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#0c0c0c] font-bold shadow-md'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[#d4af37]/20 hover:text-[#d4af37] border border-[var(--color-border)]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#d4af37] text-[#0c0c0c] font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#c29f2f] transition-all duration-300 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 group rounded-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0c0c0c]" />
                <span>Transmitting Request...</span>
              </>
            ) : (
              <>
                <span>Request Advisory Session</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
