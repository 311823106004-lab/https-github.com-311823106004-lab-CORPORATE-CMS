import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import {
  Briefcase,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Clock,
  Activity,
  X,
  Play,
  Sparkles,
  Terminal,
  Cpu,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeLiveDemo, setActiveLiveDemo] = useState<string | null>(null);

  // Requirement: Only display published projects on customer website
  const publishedProjects = useMemo(() => {
    return projects.filter((p) => p.isPublished);
  }, [projects]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [publishedProjects]);

  const filteredProjects = useMemo(() => {
    return publishedProjects.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [publishedProjects, selectedCategory, searchQuery]);

  const getStatusBadge = (status: Project['completionStatus']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>In Progress</span>
          </span>
        );
      case 'Active':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>Active Lifecycle</span>
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Portfolio & Interactive Demos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Selected Works & Interactive Demos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Explore landmark enterprise architectures and live simulations delivered for high-frequency fintech, healthcare, and logistics.
          </p>

          {/* Quick Demo Launcher Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveLiveDemo('Autonomous AI Agent Pipeline')}
              className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>Launch Demo: Autonomous Agent</span>
            </button>
            <button
              onClick={() => setActiveLiveDemo('Multi-Cloud Kubernetes Mesh')}
              className="px-4 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 text-purple-400" />
              <span>Launch Demo: Cloud Mesh</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-slate-950 rounded-2xl p-12 text-center border border-slate-800">
            <p className="text-sm font-semibold text-slate-300">No projects found in this category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-cyan-400 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="group cursor-pointer bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/60 shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                    <div className="absolute top-4 left-4">
                      {getStatusBadge(project.completionStatus)}
                    </div>

                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-5 h-5 text-cyan-300" />
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs font-bold text-purple-300 uppercase tracking-wider">
                      {project.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1">
                      Client: <span className="text-cyan-300 font-medium">{project.client}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2.5 font-display line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-5">
                      {project.description}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-300 group-hover:text-cyan-200">
                  <span>Inspect Case Architecture</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-800 overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
            <div className="relative h-64 sm:h-72 w-full bg-slate-950 flex-shrink-0">
              <img
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {activeModalProject.category}
                  </span>
                  {getStatusBadge(activeModalProject.completionStatus)}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {activeModalProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Client Organization</span>
                  <span className="text-sm font-bold text-cyan-300">{activeModalProject.client}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Deployment Year</span>
                  <span className="text-sm font-bold text-white">{activeModalProject.completionYear || '2026'}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Scope & Objectives</h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {activeModalProject.fullDetails && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Architecture & Outcomes</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    {activeModalProject.fullDetails}
                  </p>
                </div>
              )}

              {activeModalProject.tags && activeModalProject.tags.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Technologies & Protocols</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((t, idx) => (
                      <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-950 text-purple-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Demo Simulator Modal */}
      {activeLiveDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center border border-purple-500/30">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Interactive Demo Simulation
                  </h3>
                  <p className="text-xs text-cyan-300">{activeLiveDemo}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveLiveDemo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold">[READY] Initializing MESARA AI Simulated Runtime...</div>
                <div className="text-purple-300">&gt; Connecting to Node Mesh (32/32 Active)</div>
                <div className="text-cyan-300">&gt; Ingesting test payload: 10,000 synthetic events/sec</div>
                <div className="text-slate-400">&gt; Latency: 4.8ms | Packet Drop: 0.000% | CPU Load: 18%</div>
                <div className="text-emerald-400">&gt; Autonomous agent dispatched: Task #8919 verified.</div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                This is a real-time preview of the telemetry and automation pipelines MESARA AI integrates into custom client portals and enterprise applications.
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveLiveDemo(null)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
