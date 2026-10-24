import React from 'react';

/**
 * Luxury Editorial Button
 * Supports 'primary' (sliding gold), 'secondary' (1px border fill), 'accent' and 'link'
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  className = '',
  icon,
  iconPosition = 'right',
  onClick,
  href,
  disabled = false,
  type = 'button',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    small: 'h-10 px-6 text-[11px]',
    default: 'h-12 px-8 text-xs',
    large: 'h-14 px-10 text-xs md:text-sm',
  }[size] || 'h-12 px-8 text-xs';

  // Base luxury typography & structure
  const baseClasses = `
    inline-flex items-center justify-center gap-3
    font-sans font-medium uppercase tracking-[0.2em]
    transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
    cursor-pointer select-none rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]
    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
  `;

  if (variant === 'primary') {
    const primaryContent = (
      <span className={`relative overflow-hidden group bg-[#1A1A1A] text-white shadow-btn hover:shadow-btn-hover ${sizeClasses} ${baseClasses} ${className}`}>
        {/* Sliding Gold Layer */}
        <span 
          className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] pointer-events-none z-0" 
          aria-hidden="true"
        />
        {/* Text & Icon Content */}
        <span className="relative z-10 flex items-center gap-3 text-inherit transition-colors duration-300">
          {icon && iconPosition === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </span>
      </span>
    );

    if (href) {
      return (
        <a href={href} className="inline-block" {...props}>
          {primaryContent}
        </a>
      );
    }

    return (
      <button type={type} onClick={onClick} disabled={disabled} className="inline-block" {...props}>
        {primaryContent}
      </button>
    );
  }

  if (variant === 'secondary') {
    const secondaryClasses = `
      ${baseClasses} ${sizeClasses}
      bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)]
      hover:bg-[var(--color-text-primary)] hover:text-[var(--color-page-bg)]
      ${className}
    `;

    if (href) {
      return (
        <a href={href} className={secondaryClasses} {...props}>
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </a>
      );
    }

    return (
      <button type={type} onClick={onClick} disabled={disabled} className={secondaryClasses} {...props}>
        {icon && iconPosition === 'left' && <span>{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </button>
    );
  }

  if (variant === 'link') {
    const linkClasses = `
      inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-sans font-medium text-[var(--color-text-primary)]
      border-b border-[var(--color-border)] pb-1.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
      transition-colors duration-300 group ${className}
    `;

    if (href) {
      return (
        <a href={href} className={linkClasses} {...props}>
          <span>{children}</span>
          {icon ? icon : <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#D4AF37]">→</span>}
        </a>
      );
    }

    return (
      <button type={type} onClick={onClick} disabled={disabled} className={linkClasses} {...props}>
        <span>{children}</span>
        {icon ? icon : <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#D4AF37]">→</span>}
      </button>
    );
  }

  return null;
};
