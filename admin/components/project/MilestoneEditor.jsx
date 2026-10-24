import React from 'react';
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react';

export const MilestoneEditor = ({ milestones = [], onChange }) => {
  const handleAdd = () => {
    onChange([
      ...milestones,
      { label: 'New Construction Milestone', done: false },
    ]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(milestones.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
          Milestone Checklist ({milestones.length})
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="font-mono text-xs text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="space-y-2">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#141416] border border-white/10 flex items-center gap-3 hover:border-white/20 transition-all"
          >
            <button
              type="button"
              onClick={() => handleUpdate(idx, 'done', !m.done)}
              className="text-[#d4af37] hover:scale-110 transition-transform cursor-pointer"
              title={m.done ? 'Mark as Pending' : 'Mark as Done'}
            >
              {m.done ? (
                <CheckSquare className="w-4 h-4 text-[#d4af37]" />
              ) : (
                <Square className="w-4 h-4 text-white/30" />
              )}
            </button>

            <input
              type="text"
              value={m.label}
              onChange={(e) => handleUpdate(idx, 'label', e.target.value)}
              placeholder="Milestone description..."
              className={`flex-1 bg-transparent text-xs outline-none ${
                m.done ? 'text-white/90 font-medium' : 'text-white/60'
              }`}
            />

            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="p-1 text-white/30 hover:text-[#ff6b6b] transition-colors cursor-pointer"
              title="Delete milestone"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
