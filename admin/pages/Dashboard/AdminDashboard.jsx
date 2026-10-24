import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, FolderKanban, Plus, ExternalLink, Activity, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { AdminButton } from '../../components/common/AdminButton';

export const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const list = await projectService.getAll();
        setProjects(list);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalCount = projects.length;
  const pinnedCount = projects.filter((p) => p.isPinned !== false).length;
  const ongoingCount = projects.filter((p) => p.status === 'ongoing').length;
  const completedCount = projects.filter((p) => p.status === 'completed').length;

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
            EXECUTIVE CONTROL DECK
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Portfolio Telemetry &amp; Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/dossier-stack">
            <AdminButton variant="primary" icon={Layers}>
              Curate Pinned Stack
            </AdminButton>
          </Link>
          <Link to="/admin/projects/new">
            <AdminButton variant="secondary" icon={Plus}>
              New Project
            </AdminButton>
          </Link>
        </div>
      </div>

      {/* KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#141416] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-white/50">
            <span className="font-mono text-[10px] uppercase tracking-widest">Total Projects</span>
            <FolderKanban className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="font-serif text-3xl text-white font-normal">{totalCount}</p>
          <span className="font-mono text-[10px] text-white/40 block">Archived Masterpieces</span>
        </div>

        <div className="p-5 bg-[#141416] border border-[#d4af37]/30 space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4af37]/5 pointer-events-none" />
          <div className="flex items-center justify-between text-white/50">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37]">
              Pinned In Stack
            </span>
            <Layers className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="font-serif text-3xl text-[#d4af37] font-normal">{pinnedCount}</p>
          <span className="font-mono text-[10px] text-[#d4af37]/70 block">Active 3D Deck Cards</span>
        </div>

        <div className="p-5 bg-[#141416] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-white/50">
            <span className="font-mono text-[10px] uppercase tracking-widest">Ongoing</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif text-3xl text-white font-normal">{ongoingCount}</p>
          <span className="font-mono text-[10px] text-white/40 block">In Active Construction</span>
        </div>

        <div className="p-5 bg-[#141416] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-white/50">
            <span className="font-mono text-[10px] uppercase tracking-widest">Completed</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-serif text-3xl text-white font-normal">{completedCount}</p>
          <span className="font-mono text-[10px] text-white/40 block">Delivered &amp; Handed Over</span>
        </div>
      </div>

      {/* Pinned Dossier Stack Preview Widget */}
      <div className="p-6 bg-[#141416] border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#d4af37]" />
            <h2 className="font-serif text-lg text-white font-normal">
              Pinned Dossier Stack Sequence (/archive)
            </h2>
          </div>
          <Link
            to="/admin/dossier-stack"
            className="font-mono text-xs text-[#d4af37] hover:underline flex items-center gap-1"
          >
            <span>Manage Order &amp; Pins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects
            .filter((p) => p.isPinned !== false)
            .slice(0, 3)
            .map((project, idx) => (
              <div
                key={project.id}
                className="p-4 bg-[#1a1a1d] border border-white/10 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#d4af37] font-semibold">
                    0{idx + 1} // DECK
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-black/50 text-white/70 border border-white/10">
                    {project.status}
                  </span>
                </div>

                <div className="h-28 bg-black/60 overflow-hidden relative">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] text-white/70">
                    {project.location}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-sm text-white font-medium truncate">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-white/50 line-clamp-2 mt-1">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <Link
                    to={`/admin/projects/${project.id}`}
                    className="text-[#d4af37] hover:underline"
                  >
                    Customize
                  </Link>
                  <Link
                    to={`/archive/${project.id}`}
                    target="_blank"
                    className="text-white/40 hover:text-white flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
