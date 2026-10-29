import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MesaraLogo } from '../common/MesaraLogo';
import { NexoraLogo } from '../common/NexoraLogo';
import { Shield, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC<{ onNavigateSection?: (sectionId: string) => void }> = ({
  onNavigateSection,
}) => {
  const { setViewMode, isAuthenticated } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollTo = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: MESARA AI Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <MesaraLogo variant="dark" size="md" showSubtitle={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MESARA AI engineers high-performance web applications, autonomous AI agent pipelines, and intelligent business process automation with full client administrative sovereignty.
            </p>
            <div className="pt-1 text-xs text-slate-500">
              <span className="block font-semibold text-slate-300">Global Engineering Center (Demo):</span>
              100 Tech Nexus Way, Suite 800, San Francisco, CA 94105<br />
              Tel: +1 (555) 019-2834 • inquiries@mesara-ai.demo
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-cyan-300 transition-colors">
                  AI Chatbots & Agents
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-cyan-300 transition-colors">
                  Web Applications
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-cyan-300 transition-colors">
                  Business Automation
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-cyan-300 transition-colors">
                  API & Cloud Mesh
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-cyan-300 transition-colors">
                  E-Commerce Systems
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-cyan-300 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('workflow')} className="hover:text-cyan-300 transition-colors">
                  Our Process
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-cyan-300 transition-colors">
                  Case Studies & Demos
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('team')} className="hover:text-cyan-300 transition-colors">
                  Executive Team
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-cyan-300 transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Simulation */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Corporate Intelligence
            </h4>
            <p className="text-xs text-slate-400">
              Receive quarterly briefs on enterprise 3D web systems, autonomous agents, and cloud automation.
            </p>
            {newsletterSubscribed ? (
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Subscribed to MESARA AI intelligence briefs!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email..."
                  required
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-500">
              Demo environment — Simulated corporate newsletter subscription.
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Builder Spotlight & Exact Requirement Credit: "Built by MESARA AI" */}
      <div className="border-t border-slate-900 bg-slate-950/90 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <MesaraLogo variant="dark" size="md" showSubtitle={true} />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <div className="text-xs">
              <span className="text-slate-400">Smart Solutions and Limitless Possibilities.</span>
              <div className="font-extrabold text-white text-sm tracking-wide mt-0.5">
                Built by MESARA AI
              </div>
            </div>

            {/* Discreet Admin Login link in footer */}
            <button
              onClick={() => setViewMode(isAuthenticated ? 'admin' : 'login')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 text-slate-400 hover:text-cyan-300 text-xs font-medium transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Login</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Fictional Notice Bar */}
      <div className="border-t border-slate-900 py-4 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            &copy; 2026 MESARA AI. All rights reserved. Interactive 3D Enterprise Showcase.
          </div>
          <div className="flex items-center gap-4">
            <span>Corporate Technology & Business Automation</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">Built by MESARA AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
