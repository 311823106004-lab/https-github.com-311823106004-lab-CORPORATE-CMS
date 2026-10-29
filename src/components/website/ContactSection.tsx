import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const { submitContactForm, setViewMode, isAuthenticated } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject || '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry regarding: ${initialSubject}`,
      }));
    }
  }, [initialSubject]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Contact telephone is required';
    if (!formData.subject.trim()) newErrors.subject = 'Please state an inquiry subject';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your inquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      submitContactForm(formData);
      setSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-500/30">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
            Start Your Enterprise Engagement
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Discuss your technical roadmap, request an architecture audit, or explore custom software development with our senior engineering directors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                Corporate Headquarters & Offices
              </h3>

              <div className="space-y-6 text-sm text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">
                      San Francisco Tech Hub (Fictional Demo Office)
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      100 Tech Nexus Way, Suite 800<br />
                      Financial District, San Francisco, CA 94105
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">
                      Direct Telephone (Simulated Demo Line)
                    </h4>
                    <p className="text-slate-400 text-xs">
                      +1 (555) 019-2834 <span className="text-[10px] text-purple-400 font-semibold">(Toll-Free Demo)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">
                      Enterprise Inquiries
                    </h4>
                    <p className="text-slate-400 text-xs">
                      inquiries@demo-nexoratech.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">
                      Hours of Operation
                    </h4>
                    <p className="text-slate-400 text-xs">
                      Mon – Fri: 08:00 – 19:00 PST<br />
                      24/7 Global Incident Response for Contracted Clients
                    </p>
                  </div>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="mt-8 pt-6 border-t border-slate-700/80 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Submissions are stored locally in the demo admin database. No real emails or private data are sent.</span>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-slate-800">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your demo inquiry has been registered in the shared demo state. You can now immediately view, manage, and update its status inside the <span className="font-bold text-cyan-300">Admin Panel</span> under <span className="font-semibold text-purple-300">Contact Enquiries</span>.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                    <button
                      onClick={() => setViewMode(isAuthenticated ? 'admin' : 'login')}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                    >
                      View in Admin Console
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                          errors.name
                            ? 'border-rose-500/70 bg-rose-950/20 focus:border-rose-500'
                            : 'border-slate-800 bg-slate-900 focus:bg-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Corporate Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@enterprise.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                          errors.email
                            ? 'border-rose-500/70 bg-rose-950/20 focus:border-rose-500'
                            : 'border-slate-800 bg-slate-900 focus:bg-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Telephone <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                          errors.phone
                            ? 'border-rose-500/70 bg-rose-950/20 focus:border-rose-500'
                            : 'border-slate-800 bg-slate-900 focus:bg-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Subject / Project Scope <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Cloud Architecture Modernization"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                          errors.subject
                            ? 'border-rose-500/70 bg-rose-950/20 focus:border-rose-500'
                            : 'border-slate-800 bg-slate-900 focus:bg-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Project Details & Requirements <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your existing architecture, target timeline, key goals, and any regulatory constraints..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-hidden transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500/70 bg-rose-950/20 focus:border-rose-500'
                          : 'border-slate-800 bg-slate-900 focus:bg-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-900/30 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Registering Demo Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry to MESARA AI</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Instant persistence: Record will immediately appear in the admin management dashboard.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
