import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const AdminModal = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 w-full ${maxWidth} bg-[#111113] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141416]">
          <div>
            {subtitle && (
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block">
                {subtitle}
              </span>
            )}
            <h3 className="font-serif text-lg text-white font-normal">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto admin-custom-scroll">{children}</div>
      </div>
    </div>
  );
};
