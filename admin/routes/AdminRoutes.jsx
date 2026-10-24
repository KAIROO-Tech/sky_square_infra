import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminLogin } from '../pages/Login/AdminLogin';
import { AdminDashboard } from '../pages/Dashboard/AdminDashboard';
import { DossierStackManager } from '../pages/DossierStack/DossierStackManager';
import { ProjectList } from '../pages/Projects/ProjectList';
import { ProjectEditor } from '../pages/Projects/ProjectEditor';

export const AdminRoutes = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Public Admin Login Route */}
        <Route path="login" element={<AdminLogin />} />

        {/* Protected Admin Suite Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dossier-stack" element={<DossierStackManager />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectEditor />} />
          <Route path="projects/:id" element={<ProjectEditor />} />
        </Route>

        {/* Catch-all redirect to /admin */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
};
