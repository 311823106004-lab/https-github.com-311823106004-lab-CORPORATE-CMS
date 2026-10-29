import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTab } from '../../types';
import { MesaraLogo } from '../common/MesaraLogo';
import { ConfirmModal } from '../common/ConfirmModal';
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  Users,
  MessageSquareQuote,
  Inbox,
  Eye,
  RotateCcw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const {
    activeAdminTab,
    setActiveAdminTab,
    setViewMode,
    logout,
    restoreSampleData,
    services,
    projects,
    team,
    testimonials,
    enquiries,
  } = useApp();

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: Layers, badge: services.length },
    { id: 'projects', label: 'Projects', icon: Briefcase, badge: projects.length },
    { id: 'team', label: 'Our Team', icon: Users, badge: team.length },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, badge: testimonials.length },
    { id: 'enquiries', label: 'Contact Enquiries', icon: Inbox, badge: newEnquiriesCount > 0 ? newEnquiriesCount : enquiries.length },
  ];

  const handleTabClick = (tab: AdminTab) => {
    setActiveAdminTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const handleRestoreConfirm = () => {
    restoreSampleData();
    setIsRestoreModalOpen(false);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header with MESARA AI Branding */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MesaraLogo variant="dark" size="sm" showSubtitle={false} />
              <div>
                <div className="text-xs uppercase tracking-wider font-extrabold text-cyan-400">
                  3D Engine Console
                </div>
                <div className="text-sm font-extrabold text-white tracking-tight font-display">
                  MESARA AI CMS
                </div>
              </div>
            </div>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Content Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.id === 'enquiries' && newEnquiriesCount > 0
                          ? 'bg-purple-500 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions: Website Preview, Restore Sample Data, Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            System & Preview
          </div>

          {/* Website Preview button */}
          <button
            onClick={() => setViewMode('website')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Website Preview</span>
          </button>

          {/* Restore Sample Data */}
          <button
            onClick={() => setIsRestoreModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Restore Sample Data</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Log Out</span>
          </button>

          {/* MESARA AI Footer Badge */}
          <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Built by <strong className="text-slate-300">MESARA AI</strong></span>
          </div>
        </div>
      </aside>

      {/* Restore Sample Data Confirmation Dialog */}
      <ConfirmModal
        isOpen={isRestoreModalOpen}
        title="Restore Pristine Sample Data?"
        message="This will reset all Services, Case Studies, Team Members, Testimonials, and Contact Enquiries back to the initial demo state. Any custom additions or edits made during this session will be reverted."
        confirmLabel="Reset All Data"
        cancelLabel="Keep Current Changes"
        variant="warning"
        onConfirm={handleRestoreConfirm}
        onCancel={() => setIsRestoreModalOpen(false)}
      />
    </>
  );
};
