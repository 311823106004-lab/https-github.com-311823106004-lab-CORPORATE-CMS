import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NexoraLogo } from '../common/NexoraLogo';
import { MesaraLogo } from '../common/MesaraLogo';
import {
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle,
} from 'lucide-react';

export const AdminLoginScreen: React.FC = () => {
  const { login, demoLogin, setViewMode } = useApp();
  const [username, setUsername] = useState('admin@nexoratech.com');
  const [password, setPassword] = useState('nexora2026');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const ok = login(username, password);
      setIsLoading(false);
      if (!ok) {
        setError('Invalid credentials. Please use the demo credentials below or click Quick Demo Sign-In.');
      }
    }, 400);
  };

  const handleDemoSignIn = () => {
    demoLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Visual background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to website button */}
      <button
        onClick={() => setViewMode('website')}
        className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md transition-all hover:bg-slate-800 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Customer Website</span>
      </button>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header with MESARA AI & Nexora Branding */}
        <div className="bg-slate-900 p-6 sm:p-8 text-white border-b border-slate-800 text-center relative overflow-hidden">
          <div className="flex justify-center mb-4">
            <MesaraLogo variant="dark" size="sm" showSubtitle={false} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-purple-500/30">
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <span>Management Console</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            MESARA AI PLATFORM
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Smart Solutions and Limitless Possibilities • Administrative CMS
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {/* Fictional Demo notice */}
          <div className="mb-6 p-3.5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Interactive Client Demo:</span> Test real-time changes to services, projects, team members, testimonials, and contact inquiries.
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin@nexoratech.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-hidden focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-hidden focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Mode Button as required */}
          <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition-all hover:scale-101 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>1-Click Quick Demo Sign-In</span>
            </button>

            {/* Clearly labelled credentials */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                Sample Demo Credentials:
              </span>
              <div className="text-xs font-mono text-slate-700 flex items-center justify-center gap-3">
                <span>User: <strong className="text-purple-700">admin@nexoratech.com</strong></span>
                <span>Pass: <strong className="text-purple-700">nexora2026</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="py-3 px-6 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Built by <strong className="text-slate-800">MESARA AI</strong> for Nexora Technologies Demo
        </div>
      </div>
    </div>
  );
};
