import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Layers, FolderKanban, PlusCircle, Globe } from 'lucide-react';

export const AdminSidebar = () => {
  const navItems = [
    {
      to: '/admin',
      end: true,
      label: 'Telemetry Overview',
      icon: LayoutDashboard,
    },
    {
      to: '/admin/dossier-stack',
      label: 'Pinned Dossier Stack',
      icon: Layers,
      highlight: true,
    },
    {
      to: '/admin/projects',
      end: true,
      label: 'Project Dossiers',
      icon: FolderKanban,
    },
    {
      to: '/admin/projects/new',
      label: 'New Specification',
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-[#0c0c0c] flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div>
        {/* Brand Monogram */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 border border-[#d4af37]/60 flex items-center justify-center font-serif text-sm text-[#d4af37] bg-white/[0.02]">
            SQ
          </div>
          <div>
            <h2 className="font-serif text-sm tracking-wide text-white">SKY SQUARE</h2>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
              INFRA // CONTROL
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/40 font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Storage: Local JSON / Disk</span>
        </div>
        <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
          Build v1.0.0-feat-admin
        </p>
      </div>
    </aside>
  );
};
