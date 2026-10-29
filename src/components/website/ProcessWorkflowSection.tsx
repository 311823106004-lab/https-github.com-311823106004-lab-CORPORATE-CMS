import React, { useState } from 'react';
import {
  Compass,
  Palette,
  Code2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const ProcessWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'step-1',
      number: '01',
      title: 'Discover',
      tagline: 'Strategic Architectural Audit',
      icon: Compass,
      description:
        'We analyze your existing software bottlenecks, data pipelines, security requirements, and business goals to chart a precise engineering roadmap.',
      deliverables: ['System Architecture Audit', 'Data Pipeline Mapping', 'Security & Compliance Blueprint', 'Milestone Schedule'],
      color: 'from-blue-600 to-cyan-500',
    },
    {
      id: 'step-2',
      number: '02',
      title: 'Design',
      tagline: 'Futuristic 3D & Human Experience',
      icon: Palette,
      description:
        'Crafting intuitive user interfaces, 3D interactive surfaces, design tokens, and fluid motion languages that elevate brand trust and conversion.',
      deliverables: ['Interactive 3D Prototypes', 'Production Design System', 'Responsive Viewport Specs', 'Micro-Interaction Tokens'],
      color: 'from-indigo-600 to-purple-500',
    },
    {
      id: 'step-3',
      number: '03',
      title: 'Develop',
      tagline: 'Resilient Scalable Engineering',
      icon: Code2,
      description:
        'Full-cycle web, mobile, and cloud engineering with TypeScript, modern component architectures, resilient APIs, and automated CI/CD.',
      deliverables: ['React SPA / Edge Rendering', 'Multi-Cloud Kubernetes Pods', 'API Gateways & Rate Limiters', 'Zero-Downtime Rollouts'],
      color: 'from-purple-600 to-pink-500',
    },
    {
      id: 'step-4',
      number: '04',
      title: 'Automate',
      tagline: 'Autonomous AI & RPA Integration',
      icon: Cpu,
      description:
        'Infusing cognitive AI models, fine-tuned agent workflows, vector retrieval pipelines, and RPA bots that eliminate repetitive manual overhead.',
      deliverables: ['Custom AI Autonomous Agents', 'RAG Vector Indexing', 'Cross-System CRM/ERP Webhooks', 'Automated Triage Pipelines'],
      color: 'from-cyan-600 to-blue-500',
    },
    {
      id: 'step-5',
      number: '05',
      title: 'Deliver',
      tagline: 'Enterprise SLA & CMS Handover',
      icon: CheckCircle2,
      description:
        'Rigorous automated regression testing, bank-grade SOC-2 security audits, client CMS administration handover, and 24/7 observability.',
      deliverables: ['Autonomous Admin CMS Suite', '24/7 Real-Time Telemetry', 'Complete IP & Code Sovereignty', 'Enterprise SLA Guarantee'],
      color: 'from-emerald-600 to-teal-500',
    },
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  return (
    <section id="workflow" className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Structured Enterprise Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
            The MESARA AI Engineering Lifecycle
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A battle-tested 5-phase methodology engineering flawless software, intelligent automation, and autonomous client management consoles.
          </p>
        </div>

        {/* 5-Step Progress Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-purple-500 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-black font-mono ${
                      isActive ? 'text-purple-400' : 'text-slate-500'
                    }`}
                  >
                    {st.number}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-purple-600/30 text-purple-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-sm font-bold text-white font-display">{st.title}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{st.tagline}</div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-mono">
                  {current.number}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Phase {activeStep + 1}: {current.title}
                  </h3>
                  <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mt-0.5">
                    {current.tagline}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Key Engineering Deliverables</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.deliverables.map((del, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Process Node */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 rounded-3xl bg-gradient-to-br from-slate-950 to-indigo-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center shadow-2xl group">
                <div className="absolute inset-0 bg-radial from-purple-500/10 to-transparent rounded-3xl"></div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-xl mb-4 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <StepIcon className="w-10 h-10 text-cyan-300" />
                  </div>
                </div>

                <div className="text-base font-bold text-white font-display">{current.title} Protocol</div>
                <div className="text-xs text-slate-400 mt-1">Verified Enterprise Standard</div>

                {/* Next step button */}
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="mt-4 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Next Phase</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
