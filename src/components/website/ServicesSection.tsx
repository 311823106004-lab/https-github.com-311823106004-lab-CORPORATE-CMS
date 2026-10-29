import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Service } from '../../types';
import { ServiceCard3D } from './ServiceCard3D';
import {
  Search,
  Sparkles,
  X,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ServicesSection: React.FC<{ onSelectServiceForContact?: (title: string) => void }> = ({
  onSelectServiceForContact,
}) => {
  const { services } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  // Requirement: Only display published services on customer-facing website
  const publishedServices = useMemo(() => {
    return services.filter((s) => s.isPublished);
  }, [services]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedServices.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ['All', ...Array.from(set)];
  }, [publishedServices]);

  const filteredServices = useMemo(() => {
    return publishedServices.filter((s) => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [publishedServices, selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-950 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Interactive 3D Service Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
              Engineered Capabilities Tailored for Scale
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg">
              Interact with our comprehensive portfolio of web systems, cognitive AI automation, and enterprise infrastructure.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm text-xs font-semibold text-slate-300 self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>{publishedServices.length} Active Services Available</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* 3D Service Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-12 text-center border border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 text-purple-400 mx-auto flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No services match your criteria</h3>
            <p className="text-xs text-slate-400 mb-4">Try clearing filters or checking draft services in the Admin Panel.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-purple-400 bg-purple-950/60 border border-purple-800/60 rounded-lg hover:bg-purple-900/60 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, idx) => (
              <ServiceCard3D
                key={service.id}
                service={service}
                index={idx}
                onExplore={(s) => setActiveModalService(s)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-800 overflow-hidden transform transition-all">
            <div className="relative h-56 sm:h-64 w-full bg-slate-950">
              <img
                src={activeModalService.imageUrl}
                alt={activeModalService.title}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider mb-2 inline-block shadow-md">
                  {activeModalService.category}
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Capabilities Overview</h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeModalService.description}
                </p>
              </div>

              {activeModalService.fullDetails && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Technical Scope & Architecture</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    {activeModalService.fullDetails}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div>
                  {activeModalService.startingPrice && (
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Estimated Engagement Tier</span>
                      <span className="text-xl font-black text-cyan-300 font-display">
                        {activeModalService.startingPrice} <span className="text-xs font-normal text-slate-400">/ package baseline</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const serviceTitle = activeModalService.title;
                      setActiveModalService(null);
                      if (onSelectServiceForContact) {
                        onSelectServiceForContact(serviceTitle);
                      } else {
                        const contactEl = document.getElementById('contact');
                        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    Inquire About This Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
