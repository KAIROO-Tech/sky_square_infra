import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const HighlightsEditor = ({ highlights = [], onChange }) => {
  const handleAdd = () => {
    onChange([...highlights, 'New engineering specification or highlight']);
  };

  const handleUpdate = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(highlights.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
          Key Specifications &amp; Architectural Highlights ({highlights.length})
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="font-mono text-xs text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Highlight</span>
        </button>
      </div>

      <div className="space-y-2">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="p-2.5 bg-[#141416] border border-white/10 hover:border-white/20 transition-all flex items-center gap-3"
          >
            <span className="text-[#d4af37] text-xs">✦</span>
            <input
              type="text"
              value={item}
              onChange={(e) => handleUpdate(idx, e.target.value)}
              placeholder="Engineering highlight description..."
              className="flex-1 bg-transparent text-xs text-white/90 outline-none focus:text-white"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="p-1 text-white/30 hover:text-[#ff6b6b] transition-colors cursor-pointer"
              title="Delete highlight"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
