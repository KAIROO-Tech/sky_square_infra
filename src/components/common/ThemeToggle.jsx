import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center w-14 h-7 p-1 rounded-full bg-white/10 border border-white/20 hover:border-[#d4af37]/60 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${className}`}
    >
      {/* Sliding Pill Indicator */}
      <span
        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-[#d4af37] text-[#0c0c0c] flex items-center justify-center shadow-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark ? 'translate-x-0' : 'translate-x-7'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-[#0c0c0c] fill-current" />
        ) : (
          <Sun className="w-3 h-3 text-[#0c0c0c] fill-current" />
        )}
      </span>

      {/* Background Icons */}
      <div className="w-full flex items-center justify-between px-1 pointer-events-none text-white/40">
        <Moon className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
        <Sun className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
