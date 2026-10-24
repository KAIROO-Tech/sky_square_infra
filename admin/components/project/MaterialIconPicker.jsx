import React from 'react';
import {
  Trees,
  Droplets,
  Droplet,
  ShieldCheck,
  Shield,
  Zap,
  Gem,
  Cpu,
  Sun,
  Waves,
  Compass,
  Box,
  Hammer,
  Sparkles,
  Building2,
  Layers,
  Route,
  ArrowUpDown,
  Car,
  Plus,
  Trash2,
} from 'lucide-react';

export const AVAILABLE_ICONS = {
  Trees,
  Droplets,
  Droplet,
  ShieldCheck,
  Shield,
  Zap,
  Gem,
  Cpu,
  Sun,
  Waves,
  Compass,
  Box,
  Hammer,
  Sparkles,
  Building2,
  Layers,
  Route,
  ArrowUpDown,
  Car,
};

export const MaterialIconPicker = ({ items = [], onChange }) => {
  const handleAdd = () => {
    onChange([
      ...items,
      {
        icon: 'Layers',
        label: 'New Material / Amenity',
        detail: 'Specification detail description',
      },
    ]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
          Material &amp; Specification Palette ({items.length})
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="font-mono text-xs text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Palette Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => {
          const IconComp = AVAILABLE_ICONS[item.icon] || Layers;

          return (
            <div
              key={idx}
              className="p-4 bg-[#141416] border border-white/10 hover:border-white/20 transition-all space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#0c0c0c] text-[#d4af37] border border-[#d4af37]/30">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <select
                    value={item.icon || 'Layers'}
                    onChange={(e) => handleUpdate(idx, 'icon', e.target.value)}
                    className="bg-[#1c1c1f] text-white text-[11px] font-mono px-2 py-1 border border-white/10 outline-none"
                  >
                    {Object.keys(AVAILABLE_ICONS).map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1 text-white/30 hover:text-[#ff6b6b] transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleUpdate(idx, 'label', e.target.value)}
                  placeholder="Material Label (e.g. Italian Marble)"
                  className="w-full bg-[#18181b] border border-white/10 px-3 py-1.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
                <input
                  type="text"
                  value={item.detail}
                  onChange={(e) => handleUpdate(idx, 'detail', e.target.value)}
                  placeholder="Specification Detail (e.g. Bespoke precision-honed slab)"
                  className="w-full bg-[#18181b] border border-white/10 px-3 py-1.5 text-xs text-white/70 outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
