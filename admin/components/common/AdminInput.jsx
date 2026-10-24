import React from 'react';

export const AdminInput = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  disabled = false,
  className = '',
  rows,
  ...props
}) => {
  const isTextarea = type === 'textarea';

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]"
        >
          <span>
            {label} {required && <span className="text-[#ff6b6b]">*</span>}
          </span>
          {helperText && (
            <span className="text-white/40 normal-case tracking-normal text-[10px]">
              {helperText}
            </span>
          )}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={id}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows || 4}
          className="w-full bg-[#141416] border border-white/10 hover:border-white/20 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 text-[#f5f5f7] p-3 font-sans text-xs sm:text-sm leading-relaxed transition-all outline-none disabled:opacity-50"
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="w-full bg-[#141416] border border-white/10 hover:border-white/20 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 text-[#f5f5f7] px-3.5 py-2.5 font-sans text-xs sm:text-sm transition-all outline-none disabled:opacity-50"
          {...props}
        />
      )}

      {error && <p className="font-mono text-[10px] text-[#ff6b6b] tracking-wider">{error}</p>}
    </div>
  );
};
