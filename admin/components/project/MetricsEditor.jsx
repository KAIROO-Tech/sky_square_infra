import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const MetricsEditor = ({ metrics = [], onChange }) => {
  const handleAdd = () => {
    onChange([...metrics, { label: 'Metric Name', value: 'Specification Value' }]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...metrics];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(metrics.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
          Dossier Metrics &amp; Telemetry ({metrics.length})
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="font-mono text-xs text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Metric</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#141416] border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
          >
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={m.label}
                onChange={(e) => handleUpdate(idx, 'label', e.target.value)}
                placeholder="Label (e.g. Total Footprint)"
                className="w-full bg-[#1a1a1d] border border-white/5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-white/50 outline-none focus:border-[#d4af37]"
              />
              <input
                type="text"
                value={m.value}
                onChange={(e) => handleUpdate(idx, 'value', e.target.value)}
                placeholder="Value (e.g. 134,000 SFT)"
                className="w-full bg-[#1a1a1d] border border-white/5 px-2.5 py-1 text-xs font-serif text-[#d4af37] outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="p-1 text-white/30 hover:text-[#ff6b6b] transition-colors cursor-pointer"
              title="Delete metric"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
