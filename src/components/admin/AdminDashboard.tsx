import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTab } from '../../types';
import {
  Layers,
  Briefcase,
  Users,
  MessageSquareQuote,
  Inbox,
  TrendingUp,
  Activity,
  PlusCircle,
  Eye,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  BarChart3,
  PieChart,
  ShieldCheck,
} from 'lucide-react';

interface AdminDashboardProps {
  onQuickAction: (tab: AdminTab) => void;
  onOpenCreateServiceModal: () => void;
  onOpenCreateProjectModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onQuickAction,
  onOpenCreateServiceModal,
  onOpenCreateProjectModal,
}) => {
  const {
    services,
    projects,
    team,
    testimonials,
    enquiries,
    activityLogs,
    setViewMode,
  } = useApp();

  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const publishedServices = services.filter((s) => s.isPublished).length;
  const publishedProjects = projects.filter((p) => p.isPublished).length;
  const publishedTeam = team.filter((t) => t.isPublished).length;
  const publishedTestimonials = testimonials.filter((t) => t.isPublished).length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const inProgressEnquiries = enquiries.filter((e) => e.status === 'In Progress').length;
  const contactedEnquiries = enquiries.filter((e) => e.status === 'Contacted').length;
  const closedEnquiries = enquiries.filter((e) => e.status === 'Closed').length;

  const summaryCards = [
    {
      label: 'Total Services',
      total: services.length,
      published: publishedServices,
      icon: Layers,
      color: 'purple',
      tab: 'services' as AdminTab,
      glow: 'hover:border-purple-500/50 hover:shadow-purple-950/20',
    },
    {
      label: 'Total Projects',
      total: projects.length,
      published: publishedProjects,
      icon: Briefcase,
      color: 'indigo',
      tab: 'projects' as AdminTab,
      glow: 'hover:border-indigo-500/50 hover:shadow-indigo-950/20',
    },
    {
      label: 'Team Members',
      total: team.length,
      published: publishedTeam,
      icon: Users,
      color: 'cyan',
      tab: 'team' as AdminTab,
      glow: 'hover:border-cyan-500/50 hover:shadow-cyan-950/20',
    },
    {
      label: 'Testimonials',
      total: testimonials.length,
      published: publishedTestimonials,
      icon: MessageSquareQuote,
      color: 'emerald',
      tab: 'testimonials' as AdminTab,
      glow: 'hover:border-emerald-500/50 hover:shadow-emerald-950/20',
    },
    {
      label: 'Contact Enquiries',
      total: enquiries.length,
      published: newEnquiries,
      sublabel: `${newEnquiries} New Inbound`,
      icon: Inbox,
      color: 'rose',
      tab: 'enquiries' as AdminTab,
      glow: 'hover:border-rose-500/50 hover:shadow-rose-950/20',
    },
  ];

  // Calculate real service categories distribution
  const categoryCounts: Record<string, number> = {};
  services.forEach((s) => {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner with 3D CMS Highlight */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>MESARA AI • 3D Corporate Management Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            MESARA AI Administrative CMS Console
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            All modifications made here—services, project case studies, leadership profiles, or contact inquiries—synchronize seamlessly in real time with the 3D customer-facing website and browser localStorage.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setViewMode('website')}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-purple-600" />
              <span>Preview 3D Public Website</span>
            </button>
            <button
              onClick={onOpenCreateServiceModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
            <button
              onClick={onOpenCreateProjectModal}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Case Study</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards with 3D Tilt Micro-Interactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <span>Platform Metric Overview</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Real-time local state counters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {summaryCards.map((card, idx) => {
            const Icon = card.icon;
            const isHover = hoveredCardIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onClick={() => onQuickAction(card.tab)}
                style={{
                  transform: isHover
                    ? 'translateY(-4px) perspective(800px) rotateX(2deg) scale(1.02)'
                    : 'translateY(0px) perspective(800px) rotateX(0deg) scale(1)',
                  transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out',
                }}
                className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between ${card.glow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500">{card.label}</span>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-purple-50 text-slate-600 group-hover:text-purple-600 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-3xl font-black text-slate-900 font-display transition-transform group-hover:translate-x-1">
                    {card.total}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">
                    {card.sublabel || `${card.published} Published`}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Analytics & Pipeline Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enquiries Pipeline Funnel */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Inbox className="w-4 h-4 text-purple-600" />
              <span>Contact Enquiries Funnel</span>
            </h4>
            <span className="text-xs font-semibold text-slate-500">{enquiries.length} Total Records</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-purple-700">New Inbound</span>
                <span className="text-slate-700 font-bold">{newEnquiries}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${enquiries.length > 0 ? (newEnquiries / enquiries.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">In Progress</span>
                <span className="text-slate-700 font-bold">{inProgressEnquiries}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${enquiries.length > 0 ? (inProgressEnquiries / enquiries.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-700">Contacted</span>
                <span className="text-slate-700 font-bold">{contactedEnquiries}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${enquiries.length > 0 ? (contactedEnquiries / enquiries.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Closed / Converted</span>
                <span className="text-slate-700 font-bold">{closedEnquiries}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${enquiries.length > 0 ? (closedEnquiries / enquiries.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services Category Breakdown */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-600" />
              <span>Services by Category</span>
            </h4>
            <span className="text-xs font-semibold text-slate-500">{services.length} Total Services</span>
          </div>

          <div className="space-y-2.5">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / services.length) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{cat}</span>
                    <span className="text-slate-500">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Activities & Inbound Enquiries Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity Log */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <h3 className="text-base font-bold text-slate-900 font-display">
                Recent Admin Activity Log
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Demo session recording</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
            {activityLogs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No activities recorded in current session.</p>
            ) : (
              activityLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800 truncate">{log.action}</span>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{log.details}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Enquiries Preview */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900 font-display">
                Inbound Inquiries
              </h3>
            </div>
            <button
              onClick={() => onQuickAction('enquiries')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer"
            >
              View All ({enquiries.length})
            </button>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                onClick={() => onQuickAction('enquiries')}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-purple-200 bg-slate-50/70 hover:bg-purple-50/20 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{enq.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    enq.status === 'New'
                      ? 'bg-purple-100 text-purple-700'
                      : enq.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-700'
                      : enq.status === 'Contacted'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-medium truncate">{enq.subject}</div>
                <div className="text-[10px] text-slate-400 mt-1 truncate">{enq.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
