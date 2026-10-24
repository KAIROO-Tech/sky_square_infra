import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useProjects } from '../../../src/context/ProjectsContext';
import { AdminButton } from '../../components/common/AdminButton';
import { AdminModal } from '../../components/common/AdminModal';

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { refreshProjects } = useProjects();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await projectService.delete(deleteTarget.id);
      await loadProjects();
      await refreshProjects();
      setDeleteTarget(null);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || p.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
            CATALOGUE DIRECTORY
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Project Specification Dossiers
          </h1>
          <p className="font-sans text-xs text-white/50 mt-1">
            Browse, inspect, and configure individual project dossiers for{' '}
            <code className="text-[#d4af37]">/archive/:projectSlug</code>.
          </p>
        </div>

        <Link to="/admin/projects/new">
          <AdminButton variant="primary" icon={Plus}>
            New Specification
          </AdminButton>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#141416] p-4 border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects by title, location, or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1c1c1f] border border-white/10 pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:border-[#d4af37] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto font-mono text-xs">
          {['all', 'ongoing', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 uppercase tracking-wider border cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-[#d4af37] text-black font-semibold border-[#d4af37]'
                  : 'bg-white/5 text-white/60 hover:text-white border-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="border border-white/10 bg-[#141416] overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37] bg-[#0c0c0c]/50">
              <th className="py-3 px-4">Order / Media</th>
              <th className="py-3 px-4">Project Title &amp; Location</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status &amp; Pin</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-sans">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-white/40 font-mono text-xs">
                  No matching projects found.
                </td>
              </tr>
            ) : (
              filtered.map((project, idx) => (
                <tr
                  key={project.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#d4af37] font-semibold w-6">
                        0{(project.stackOrder ?? idx) + 1}
                      </span>
                      <div className="w-12 h-8 bg-black/60 overflow-hidden flex-shrink-0 border border-white/10">
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="min-w-0">
                      <Link
                        to={`/admin/projects/${project.id}`}
                        className="font-serif text-sm text-white font-medium hover:text-[#d4af37] transition-colors block truncate"
                      >
                        {project.title}
                      </Link>
                      <span className="font-mono text-[10px] text-white/40 block truncate">
                        📍 {project.location} • <code className="text-white/60">/{project.id}</code>
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">
                      {project.category}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border ${
                          project.status === 'ongoing'
                            ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                            : 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30'
                        }`}
                      >
                        {project.status}
                      </span>

                      {project.isPinned !== false && (
                        <span className="font-mono text-[9px] text-[#d4af37] bg-[#d4af37]/10 px-1.5 py-0.5 border border-[#d4af37]/30 flex items-center gap-1 uppercase tracking-wider">
                          <Layers className="w-2.5 h-2.5" /> Pinned
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/archive/${project.id}`}
                        target="_blank"
                        className="p-1.5 text-white/40 hover:text-white transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        to={`/admin/projects/${project.id}`}
                        className="px-2.5 py-1 bg-[#1a1a1d] text-white hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/40 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Customize</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(project)}
                        className="p-1.5 text-white/30 hover:text-[#ff6b6b] transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Removal of Specification"
        subtitle="DELETION WARNING"
      >
        <div className="space-y-4">
          <div className="p-3 bg-[#241212] border border-[#ff6b6b]/40 text-[#ff6b6b] text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>
              Are you sure you want to delete dossier <strong className="text-white">"{deleteTarget?.title}"</strong>?
            </span>
          </div>
          <p className="font-sans text-xs text-white/60 leading-relaxed">
            This will permanently remove the project and its configuration from the database. This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-3">
            <AdminButton
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
            >
              Cancel
            </AdminButton>
            <AdminButton
              variant="danger"
              onClick={handleDelete}
              loading={isDeleting}
            >
              Confirm Delete
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};
