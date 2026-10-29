import React from 'react';

interface NexoraLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 p-0.5 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 group`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/30 opacity-70"></div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300 relative z-10"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight font-display ${
            variant === 'dark' ? 'text-white' : 'text-slate-900'
          } ${textSizes[size]}`}>
            NEXORA
          </span>
          <span className="text-[9px] uppercase tracking-widest font-black px-1 py-0.5 rounded bg-purple-100 text-purple-700">
            TECH
          </span>
        </div>
        <span className={`text-[9px] tracking-widest uppercase font-semibold mt-0.5 ${
          variant === 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Technologies
        </span>
      </div>
    </div>
  );
};
