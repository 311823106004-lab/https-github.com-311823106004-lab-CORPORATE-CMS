import React from 'react';
import { useApp } from '../../context/AppContext';
import { AICoreScene } from '../3d/AICoreScene';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Sparkles,
  Layers,
  Play,
  Rotate3d,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreServices: () => void;
  onViewDemos: () => void;
  onContactUs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onViewDemos,
  onContactUs,
}) => {
  const { setViewMode, isAuthenticated } = useApp();

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 md:pt-16 md:pb-28 border-b border-slate-800"
    >
      {/* Dynamic 3D Spatial Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),transparent)]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Headline, Brand Identity & CTAs */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left z-20">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>MESARA AI • Enterprise Technology & Automation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-display">
              Technology That Moves Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                Business Forward.
              </span>
            </h1>

            {/* Official Tagline & Company Description */}
            <div className="space-y-2">
              <div className="text-base sm:text-lg font-bold text-cyan-300 tracking-wide font-display">
                Smart Solutions and Limitless Possibilities
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                MESARA AI engineers high-performance web applications, autonomous AI agent pipelines, and intelligent business process automation with full client administrative sovereignty.
              </p>
            </div>

            {/* CTAs: Explore Our Services, View Our Demos, Contact Us */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-900/30 transition-all hover:scale-102 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewDemos}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white border border-slate-700 hover:border-cyan-500/50 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Our Demos</span>
              </button>

              <button
                onClick={onContactUs}
                className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center cursor-pointer"
              >
                Contact Us
              </button>

              <button
                onClick={() => setViewMode(isAuthenticated ? 'admin' : 'login')}
                className="px-3.5 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/70 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Open Administrative CMS Console"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Admin CMS</span>
              </button>
            </div>

            {/* High-Level Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Autonomous AI Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero-Downtime Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Persistent Admin CMS</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-display">99.99%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Core SLA</div>
              </div>
              <div className="border-x border-slate-800">
                <div className="text-xl sm:text-2xl font-black text-purple-400 font-display">140+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Delivered</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400 font-display">45%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Efficiency Gain</div>
              </div>
            </div>
          </div>

          {/* Right Column: Unique 3D Technological Centerpiece */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full relative">
              <AICoreScene
                onExploreServices={onExploreServices}
                onViewDemos={onViewDemos}
                onContactUs={onContactUs}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
