import React from 'react';
import { Target, Compass, Award, Shield, Cpu, Users, Milestone, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const milestones = [
    { year: '2019', title: 'MESARA AI Core Lab Founded', desc: 'Launched by senior distributed systems architects dedicated to autonomous intelligence and cloud modernization.' },
    { year: '2022', title: 'Global Multi-Cloud & RPA Scale', desc: 'Surpassed 80 enterprise client deployments across North America, Europe, and Asia-Pacific markets.' },
    { year: '2024', title: 'Autonomous Agent Framework', desc: 'Pioneered proprietary vector memory pipelines and multi-agent reasoning systems for high-compliance sectors.' },
    { year: '2026', title: 'Interactive 3D Enterprise CMS', desc: 'Powering mission-critical platforms with 99.99% uptime, 3D visual architectures, and autonomous client control.' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision Engineering',
      desc: 'We construct systems capable of absorbing exponential scale without performance degradation or data loss.',
    },
    {
      icon: Shield,
      title: 'Institutional Trust',
      desc: 'Security is not an afterthought. Every line of code conforms to zero-trust principles and rigorous compliance audits.',
    },
    {
      icon: Cpu,
      title: 'Applied Innovation',
      desc: 'We filter the noise in emerging tech, deploying proven artificial intelligence and cloud paradigms that generate real ROI.',
    },
    {
      icon: Users,
      title: 'Client Sovereignty',
      desc: 'No vendor lock-in. We build clean, documented architectures with autonomous client administrative consoles.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>About MESARA AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Smart Solutions and Limitless Possibilities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            MESARA AI is a next-generation corporate technology consultancy. We partner with visionary leaders to architect high-performance software, immersive 3D digital experiences, and autonomous AI automation systems.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="relative p-8 rounded-3xl bg-slate-950 text-white overflow-hidden shadow-2xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Compass className="w-36 h-36 text-purple-400" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3 text-white">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To dismantle digital complexity and deliver robust, resilient software and artificial intelligence infrastructures that enable organizations to outperform competition, safeguard critical assets, and innovate at lightspeed.
              </p>
            </div>
          </div>

          <div className="relative p-8 rounded-3xl bg-slate-950 text-white overflow-hidden shadow-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Target className="w-36 h-36 text-cyan-400" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3 text-white">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To stand as the global benchmark for dependable enterprise software engineering—where proprietary algorithms, cloud resilience, and intuitive user experiences converge seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Our Core Guiding Principles
            </h3>
            <p className="text-slate-400 text-sm mt-2">The engineering mindset behind every system we architect</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/20 text-purple-300 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-display">{val.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2 border border-cyan-500/30">
              <Milestone className="w-3.5 h-3.5" />
              <span>Evolution Timeline</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Key Growth Milestones
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-purple-500/40 transition-colors">
                <div className="inline-block px-3 py-1 rounded-lg bg-purple-600 text-white font-black text-sm mb-3 font-mono">
                  {m.year}
                </div>
                <h4 className="text-base font-bold text-white mb-1.5 font-display">{m.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
