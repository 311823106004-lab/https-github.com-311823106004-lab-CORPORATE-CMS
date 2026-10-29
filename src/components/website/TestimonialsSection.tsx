import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquareQuote, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();

  // Requirement: Only display published testimonials
  const publishedTestimonials = useMemo(() => {
    return testimonials.filter((t) => t.isPublished);
  }, [testimonials]);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Client Perspectives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Trusted by Forward-Thinking Enterprise Teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Hear how our engineering and consulting solutions have enabled leading organizations to achieve measurable transformation.
          </p>
        </div>

        {/* Fictional Demonstration Disclosure Banner as required */}
        <div className="max-w-3xl mx-auto mb-14 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <span className="font-bold">Fictional Demonstration Notice:</span> The reviews and company endorsements below are simulated case examples created exclusively for this MESARA AI corporate website demo.
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-950/30 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                {/* Rating stars and quote glyph */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300">
                    {t.projectCategory || 'Enterprise Scale'}
                  </span>
                </div>

                {/* Feedback */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-8">
                  "{t.feedback}"
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/40 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{t.clientName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {t.clientRole}, <span className="text-purple-300 font-semibold">{t.clientCompany}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
