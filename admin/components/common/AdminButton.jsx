import React from 'react';
import { Loader2 } from 'lucide-react';

export const AdminButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3 text-xs',
  };

  const variantStyles = {
    primary:
      'bg-[#d4af37] text-[#0c0c0c] font-semibold hover:bg-[#e5c158] shadow-md shadow-[#d4af37]/10 active:scale-[0.99]',
    secondary:
      'bg-[#161618] text-[#f5f5f7] border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#1f1f23]',
    danger:
      'bg-[#221010] text-[#ff6b6b] border border-[#ff6b6b]/40 hover:bg-[#331515] hover:border-[#ff6b6b]',
    ghost:
      'bg-transparent text-white/70 hover:text-white hover:bg-white/5 border border-transparent',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin mr-2 text-current" />
      ) : Icon ? (
        <Icon className="w-3.5 h-3.5 mr-2 text-current" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
