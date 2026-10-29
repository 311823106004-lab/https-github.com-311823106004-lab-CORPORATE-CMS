import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MesaraLogo } from '../common/MesaraLogo';
import { NexoraLogo } from '../common/NexoraLogo';
import { PublicPage } from '../../types';
import {
  Menu,
  X,
  Shield,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Activity,
  Layers,
} from 'lucide-react';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const { activePublicPage, setActivePublicPage, setViewMode, isAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; id: PublicPage; anchor: string }[] = [
    { label: 'Home', id: 'home', anchor: 'hero' },
    { label: 'About Us', id: 'about', anchor: 'about' },
    { label: '3D Services', id: 'services', anchor: 'services' },
    { label: 'Portfolio & Demos', id: 'projects', anchor: 'projects' },
    { label: 'Process', id: 'home', anchor: 'workflow' },
    { label: 'Our Team', id: 'team', anchor: 'team' },
    { label: 'Testimonials', id: 'testimonials', anchor: 'testimonials' },
    { label: 'Contact', id: 'contact', anchor: 'contact' },
  ];

  const handleNavClick = (item: { label: string; id: PublicPage; anchor: string }) => {
    setActivePublicPage(item.id);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(item.anchor);
    } else {
      const el = document.getElementById(item.anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Demo Header Banner highlighting MESARA AI */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              MESARA AI Platform:
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Smart Solutions & Limitless Possibilities • Interactive 3D Architecture
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setViewMode(isAuthenticated ? 'admin' : 'login')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11px] font-bold shadow-sm transition-all hover:scale-102 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? 'Open Admin Console' : 'Live Admin Login'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* MESARA AI Official Logo & Co-Brand */}
          <div
            onClick={() => handleNavClick({ label: 'Home', id: 'home', anchor: 'hero' })}
            className="cursor-pointer transition-transform hover:opacity-95 flex items-center gap-3"
          >
            <MesaraLogo variant="dark" size="md" showSubtitle={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const isActive = activePublicPage === item.id;
              return (
                <button
                  key={`${item.anchor}-${idx}`}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-purple-950/60 font-bold border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick({ label: 'Contact', id: 'contact', anchor: 'contact' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-900/30 transition-all hover:scale-102 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-cyan-300" />
              <span>Request Consultation</span>
            </button>

            <button
              onClick={() => setViewMode(isAuthenticated ? 'admin' : 'login')}
              title="Access Admin CMS"
              className="p-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-purple-300 hover:border-purple-500/50 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setViewMode(isAuthenticated ? 'admin' : 'login')}
              className="p-2 text-purple-300 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1 mb-4">
            {navItems.map((item, idx) => {
              const isActive = activePublicPage === item.id;
              return (
                <button
                  key={`m-${item.anchor}-${idx}`}
                  onClick={() => handleNavClick(item)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-purple-900/40 text-cyan-300 font-bold border border-purple-500/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick({ label: 'Contact', id: 'contact', anchor: 'contact' });
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-center text-xs shadow-md"
            >
              Request Consultation
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setViewMode(isAuthenticated ? 'admin' : 'login');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-800 font-semibold text-center text-xs flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login Console'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
