import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Mail, Linkedin, Sparkles } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const { team } = useApp();

  // Requirement: Only display published team members
  const publishedTeam = useMemo(() => {
    return team.filter((t) => t.isPublished);
  }, [team]);

  return (
    <section id="team" className="py-20 md:py-28 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Executive Leadership & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            The Minds Behind MESARA AI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A multidisciplinary collective of distributed systems architects, artificial intelligence researchers, and security specialists.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {publishedTeam.map((member) => (
            <div
              key={member.id}
              className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-950/30 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
            >
              <div>
                {/* Profile Photo */}
                <div className="relative h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={member.profileImageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] uppercase font-extrabold text-cyan-300 tracking-wider block">
                      {member.department}
                    </span>
                    <h3 className="text-lg font-bold text-white font-display">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="text-xs font-bold text-purple-400 mb-2.5">
                    {member.designation}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Social and Contact Badges */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium">Verified Profile</span>
                <div className="flex items-center gap-2">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                      title="Direct Contact"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
