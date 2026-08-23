import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: null,
    timeSlot: '10:00 AM'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    '10:00 PM'
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
      return 'Please Enter A Valid Phone Number';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      newErrors.phone = phoneErr;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a preferred meeting date from the calendar';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
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

  const formattedSelectedDate = formData.date
    ? formData.date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  if (isSubmitted) {
    return (
      <div className="bg-[#EBE5DE]/30 border-t-2 border-t-[#D4AF37] border border-[#1A1A1A]/10 p-8 md:p-12 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
        </div>
        <h3 className="font-serif text-3xl text-[#1A1A1A] mb-3">
          Advisory Request Confirmed
        </h3>
        <p className="font-sans text-sm text-[#6C6863] leading-relaxed max-w-md mx-auto mb-8 font-light">
          Thank you, <span className="font-medium text-[#1A1A1A]">{formData.name}</span>. Our executive consultation team has received your request for <span className="font-medium text-[#1A1A1A]">{formattedSelectedDate}</span> at <span className="font-medium text-[#D4AF37]">{formData.timeSlot}</span>.
        </p>

        <div className="bg-[#F9F8F6] p-6 border border-[#1A1A1A]/10 text-left text-xs font-sans space-y-3 mb-8 max-w-md mx-auto">
          <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-2">
            <span className="text-[#6C6863]">Phone Contact:</span>
            <span className="font-medium text-[#1A1A1A]">+91 {formData.phone}</span>
          </div>
          <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-2">
            <span className="text-[#6C6863]">Email Desk:</span>
            <span className="font-medium text-[#1A1A1A]">{formData.email}</span>
          </div>
          <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-2">
            <span className="text-[#6C6863]">Meeting Date:</span>
            <span className="font-medium text-[#1A1A1A]">{formattedSelectedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6C6863]">Time Dial Slot:</span>
            <span className="font-medium text-[#D4AF37]">{formData.timeSlot} IST</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              date: null,
              timeSlot: '10:00 AM'
            });
          }}
          className="px-8 py-3.5 bg-[#1A1A1A] text-[#F9F8F6] font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300"
        >
          Schedule Another Session
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#EBE5DE]/30 border-t-2 border-t-[#1A1A1A] border border-[#1A1A1A]/10 p-8 md:p-10 shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#D4AF37]" />
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            Executive Advisory Form
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
          Schedule a Consultation
        </h2>
        <p className="font-sans text-xs text-[#6C6863] mt-2 font-light leading-relaxed">
          Provide your details and select your preferred meeting date and time slot with our senior engineering & acquisition directors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block font-sans text-xs uppercase tracking-[0.15em] text-[#1A1A1A] font-medium mb-2">
            Full Name <span className="text-[#D4AF37]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#6C6863] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Rahul Verma"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              className={`w-full bg-[#F9F8F6] border ${
                errors.name ? 'border-red-500' : 'border-[#1A1A1A]/15 focus:border-[#D4AF37]'
              } pl-10 pr-4 py-3 font-sans text-sm text-[#1A1A1A] placeholder-[#6C6863]/50 outline-none transition-colors`}
            />
          </div>
          {errors.name && (
            <p className="font-sans text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block font-sans text-xs uppercase tracking-[0.15em] text-[#1A1A1A] font-medium mb-2">
            Phone Number <span className="text-[#D4AF37]">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center gap-1.5 text-[#6C6863] font-sans text-xs font-medium border-r border-[#1A1A1A]/10 pr-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>+91</span>
            </div>
            <input
              type="tel"
              maxLength={10}
              placeholder="98765 43210"
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              className={`w-full bg-[#F9F8F6] border ${
                errors.phone ? 'border-red-500' : 'border-[#1A1A1A]/15 focus:border-[#D4AF37]'
              } pl-20 pr-4 py-3 font-sans text-sm text-[#1A1A1A] placeholder-[#6C6863]/50 outline-none transition-colors tracking-wide`}
            />
          </div>
          {errors.phone ? (
            <p className="font-sans text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          ) : (
            <p className="font-sans text-[11px] text-[#6C6863] mt-1">
              Must be 10 digits phone number.
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-sans text-xs uppercase tracking-[0.15em] text-[#1A1A1A] font-medium mb-2">
            Email Address <span className="text-[#D4AF37]">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#6C6863] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              className={`w-full bg-[#F9F8F6] border ${
                errors.email ? 'border-red-500' : 'border-[#1A1A1A]/15 focus:border-[#D4AF37]'
              } pl-10 pr-4 py-3 font-sans text-sm text-[#1A1A1A] placeholder-[#6C6863]/50 outline-none transition-colors`}
            />
          </div>
          {errors.email && (
            <p className="font-sans text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Premium Calendar Component */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <label className="font-sans text-xs uppercase tracking-[0.15em] text-[#1A1A1A] font-medium flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>Select Consultation Date</span> <span className="text-[#D4AF37]">*</span>
            </label>
            {formData.date && (
              <span className="font-sans text-xs text-[#D4AF37] font-medium">
                {formattedSelectedDate}
              </span>
            )}
          </div>

          <div className="bg-[#F9F8F6] border border-[#1A1A1A]/15 p-4 shadow-inner">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4 border-b border-[#1A1A1A]/10 pb-3">
              <span className="font-serif text-lg text-[#1A1A1A] font-normal">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={currentYear === today.getFullYear() && currentMonth <= today.getMonth()}
                  className="p-1.5 hover:bg-[#1A1A1A]/5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1A1A]"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-[#1A1A1A]/5 rounded transition-colors text-[#1A1A1A]"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <span key={d} className="font-sans text-[11px] uppercase tracking-wider text-[#6C6863] font-medium">
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
                    disabled={past}
                    onClick={() => handleDateSelect(day)}
                    className={`h-9 flex items-center justify-center font-sans text-xs font-medium transition-all duration-200 ${
                      selected
                        ? 'bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37] shadow-sm font-semibold scale-105'
                        : past
                        ? 'text-[#6C6863]/30 cursor-not-allowed'
                        : 'text-[#1A1A1A] hover:bg-[#D4AF37]/15 hover:text-[#1A1A1A] border border-transparent'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
          {errors.date && (
            <p className="font-sans text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
            </p>
          )}
        </div>

        {/* Premium Time Dial Selector (10:00 AM - 10:00 PM) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <label className="font-sans text-xs uppercase tracking-[0.15em] text-[#1A1A1A] font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Time Dial Selector (10:00 AM – 10:00 PM IST)</span>
            </label>
            <span className="font-sans text-xs text-[#D4AF37] font-medium">
              {formData.timeSlot}
            </span>
          </div>

          <div className="bg-[#F9F8F6] border border-[#1A1A1A]/15 p-4">
            <p className="font-sans text-[11px] text-[#6C6863] mb-3">
              Select your convenient time window:
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = formData.timeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                    className={`py-2 px-2 text-center font-sans text-xs transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37] font-medium shadow-sm'
                        : 'bg-[#EBE5DE]/40 text-[#1A1A1A] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 border border-transparent'
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
            className="w-full py-4 bg-[#1A1A1A] text-[#F9F8F6] font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-500 shadow-md flex items-center justify-center gap-2 group"
          >
            <span>Request Advisory Session</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};
