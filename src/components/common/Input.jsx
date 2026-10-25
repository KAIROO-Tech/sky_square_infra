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
  id,
  required = false,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputId = id || name;
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-secondary)] font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[var(--color-accent)]">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full h-12 bg-transparent text-[var(--color-text-primary)] text-sm font-sans px-0 py-2 border-b transition-colors duration-300 rounded-none placeholder:font-serif placeholder:italic placeholder:text-[var(--color-input-placeholder)] placeholder:text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ${
          error
            ? 'border-red-500 text-red-500 focus:border-red-500'
            : 'border-[var(--color-input-border)] focus:border-[var(--color-accent)]'
        }`}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="font-sans text-xs text-red-600 dark:text-red-400 mt-1 animate-fadeIn">
          {error}
        </span>
      )}
      {helperText && !error && <span className="font-sans text-[11px] text-[var(--color-text-muted)]">{helperText}</span>}
    </div>
  );
};

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  id,
  rows = 4,
  required = false,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) => {
  const textareaId = id || name;
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-secondary)] font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[var(--color-accent)]">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full bg-transparent text-[var(--color-text-primary)] text-sm font-sans px-0 py-2 border-b transition-colors duration-300 rounded-none placeholder:font-serif placeholder:italic placeholder:text-[var(--color-input-placeholder)] placeholder:text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ${
          error
            ? 'border-red-500 text-red-500 focus:border-red-500'
            : 'border-[var(--color-input-border)] focus:border-[var(--color-accent)]'
        }`}
        {...props}
      />
      {error && (
        <span id={`${textareaId}-error`} className="font-sans text-xs text-red-600 dark:text-red-400 mt-1 animate-fadeIn">
          {error}
        </span>
      )}
      {helperText && !error && <span className="font-sans text-[11px] text-[var(--color-text-muted)]">{helperText}</span>}
    </div>
  );
};

export const Select = ({
  label,
  options = [],
  value,
  onChange,
  name,
  id,
  required = false,
  error,
  className = '',
  ...props
}) => {
  const selectId = id || name;
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="font-sans text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-secondary)] font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[var(--color-accent)]">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={`w-full h-12 bg-transparent text-[var(--color-text-primary)] text-sm font-sans px-0 py-2 border-b transition-colors duration-300 rounded-none cursor-pointer focus:outline-none ${
          error
            ? 'border-red-500 text-red-500 focus:border-red-500'
            : 'border-[var(--color-input-border)] focus:border-[var(--color-accent)]'
        }`}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${selectId}-error`} className="font-sans text-xs text-red-600 dark:text-red-400 mt-1 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};
