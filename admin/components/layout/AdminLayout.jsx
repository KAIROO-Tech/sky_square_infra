import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import '../../styles/admin.css';

export const AdminLayout = () => {
  return (
    <div className="admin-shell min-h-screen bg-[#0c0c0c] text-[#f5f5f7] flex flex-col">
      <AdminHeader />
      <div className="flex-1 flex min-h-[calc(100vh-4rem)]">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden p-6 sm:p-8 md:p-12 bg-[#0e0e10]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
