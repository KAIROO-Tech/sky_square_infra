import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { projects as fallbackProjects } from '../data/projects';

const ProjectsContext = createContext(null);
const SYNC_CHANNEL = 'sky_projects_sync';

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProjects(json.data);
      } else {
        setProjects(fallbackProjects);
      }
      setError(null);
    } catch (err) {
      console.warn('API /api/projects not reached, using fallback project data:', err.message);
      setProjects(fallbackProjects);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Broadcast mutation to other open tabs
  const broadcastSync = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const channel = new BroadcastChannel(SYNC_CHANNEL);
        channel.postMessage({ type: 'PROJECTS_UPDATED', timestamp: Date.now() });
        channel.close();
      }
    } catch (e) {
      // Ignore broadcast errors
    }
  }, []);

  const refreshProjects = useCallback(async () => {
    await fetchProjects();
    broadcastSync();
  }, [fetchProjects, broadcastSync]);

  // Initial fetch and cross-tab sync listeners
  useEffect(() => {
    fetchProjects();

    // 1. Cross-tab BroadcastChannel listener
    let channel = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel(SYNC_CHANNEL);
        channel.onmessage = (event) => {
          if (event.data?.type === 'PROJECTS_UPDATED') {
            fetchProjects();
          }
        };
      } catch (e) {
        // BroadcastChannel unavailable
      }
    }

    // 2. Focus listener: when user switches back to this browser tab, re-sync
    const handleFocus = () => {
      fetchProjects();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      if (channel) {
        channel.close();
      }
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchProjects]);

  // Pinned projects sorted strictly by stackOrder
  const pinnedProjects = projects
    .filter((p) => p.isPinned !== false)
    .sort((a, b) => (a.stackOrder ?? 0) - (b.stackOrder ?? 0));

  // Find project by slug/id with robust canonical normalization
  const getProject = useCallback(
    (slugOrId) => {
      if (!slugOrId) return null;
      const target = slugOrId.toLowerCase().trim();
      const normalize = (str) =>
        (str || '')
          .toLowerCase()
          .trim()
          .replace(/-sft/g, '')
          .replace(/-project/g, '')
          .replace(/-blueprint/g, '')
          .replace(/-attapur/g, '');

      const normTarget = normalize(target);
      return projects.find((p) => {
        const id = (p.id || '').toLowerCase();
        if (id === target) return true;
        return normalize(id) === normTarget;
      });
    },
    [projects]
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        pinnedProjects,
        loading,
        error,
        refreshProjects,
        broadcastSync,
        getProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return ctx;
};

