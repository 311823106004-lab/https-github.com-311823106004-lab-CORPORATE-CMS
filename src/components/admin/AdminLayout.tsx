import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { ServicesManager } from './ServicesManager';
import { ProjectsManager } from './ProjectsManager';
import { TeamManager } from './TeamManager';
import { TestimonialManager } from './TestimonialManager';
import { EnquiryManager } from './EnquiryManager';
import { NexoraLogo } from '../common/NexoraLogo';
import { MesaraLogo } from '../common/MesaraLogo';
import {
  Menu,
  Eye,
  LogOut,
  Bell,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  User,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const {
    activeAdminTab,
    setActiveAdminTab,
    setViewMode,
    adminUser,
    logout,
    enquiries,
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openServiceModalTrigger, setOpenServiceModalTrigger] = useState(false);
  const [openProjectModalTrigger, setOpenProjectModalTrigger] = useState(false);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const tabTitles: Record<string, string> = {
    dashboard: 'Administrative Overview',
    services: 'Services & Capabilities',
    projects: 'Projects & Case Studies',
    team: 'Executive & Engineering Team',
    testimonials: 'Testimonials & Reviews',
    enquiries: 'Inbound Contact Enquiries',
  };

  return (
    <div className="min-h-screen bg-slate-100/80 flex flex-col lg:flex-row antialiased">
      {/* Sidebar for Desktop & Mobile Sheet */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Navigation Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="hidden sm:inline">Nexora Console</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <span className="text-slate-900 font-bold font-display">
                {tabTitles[activeAdminTab] || 'Management'}
              </span>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            {/* Live Shared State Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Synced with Customer Website</span>
            </div>

            {/* Return to Customer Website */}
            <button
              onClick={() => setViewMode('website')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Website</span>
            </button>

            {/* Admin User profile pill */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="leading-tight text-left">
                <div className="font-bold text-slate-900">{adminUser?.name || 'Administrator'}</div>
                <div className="text-[10px] text-slate-500">{adminUser?.role || 'Admin'}</div>
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content View Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {activeAdminTab === 'dashboard' && (
            <AdminDashboard
              onQuickAction={(tab) => setActiveAdminTab(tab)}
              onOpenCreateServiceModal={() => {
                setActiveAdminTab('services');
                setOpenServiceModalTrigger(true);
              }}
              onOpenCreateProjectModal={() => {
                setActiveAdminTab('projects');
                setOpenProjectModalTrigger(true);
              }}
            />
          )}

          {activeAdminTab === 'services' && (
            <ServicesManager
              isCreateModalOpen={openServiceModalTrigger}
              onCloseCreateModal={() => setOpenServiceModalTrigger(false)}
            />
          )}

          {activeAdminTab === 'projects' && (
            <ProjectsManager
              isCreateModalOpen={openProjectModalTrigger}
              onCloseCreateModal={() => setOpenProjectModalTrigger(false)}
            />
          )}

          {activeAdminTab === 'team' && <TeamManager />}

          {activeAdminTab === 'testimonials' && <TestimonialManager />}

          {activeAdminTab === 'enquiries' && <EnquiryManager />}
        </main>
      </div>
    </div>
  );
};
