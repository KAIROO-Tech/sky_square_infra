import React from 'react';

/**
 * Underline-Only Luxury Input Component
 * Uses Inter for values, Playfair Display Italic for placeholders, and gold focus states
 */
export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#6C6863] font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[#D4AF37]">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full h-12 bg-transparent text-[#1A1A1A] text-sm font-sans px-0 py-2 border-b border-[#1A1A1A]/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-500 rounded-none placeholder:font-serif placeholder:italic placeholder:text-[#6C6863]/60 placeholder:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      />
      {error && <span className="font-sans text-xs text-red-600 mt-1">{error}</span>}
      {helperText && !error && <span className="font-sans text-[11px] text-[#6C6863]/80">{helperText}</span>}
    </div>
  );
};

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  rows = 4,
  required = false,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#6C6863] font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[#D4AF37]">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-transparent text-[#1A1A1A] text-sm font-sans px-0 py-2 border-b border-[#1A1A1A]/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-500 rounded-none placeholder:font-serif placeholder:italic placeholder:text-[#6C6863]/60 placeholder:text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      />
      {error && <span className="font-sans text-xs text-red-600 mt-1">{error}</span>}
      {helperText && !error && <span className="font-sans text-[11px] text-[#6C6863]/80">{helperText}</span>}
    </div>
  );
};

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  name,
  required = false,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#6C6863] font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[#D4AF37]">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full h-12 bg-transparent text-[#1A1A1A] text-sm font-sans px-0 py-2 border-b border-[#1A1A1A]/30 focus:border-[#D4AF37] focus:outline-none transition-colors duration-500 rounded-none cursor-pointer"
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-[#F9F8F6] text-[#1A1A1A]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="font-sans text-xs text-red-600 mt-1">{error}</span>}
    </div>
  );
};
