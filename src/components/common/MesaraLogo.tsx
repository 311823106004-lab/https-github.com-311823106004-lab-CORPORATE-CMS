import React, { useState } from 'react';

interface MesaraLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'glass';
}

export const MesaraLogo: React.FC<MesaraLogoProps> = ({
  className = '',
  showSubtitle = true,
  size = 'md',
  variant = 'light',
}) => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = '/assets/aistudio/WhatsApp_Image_2026-10-22_at_10.37.05_AM__1__65fef965.jpeg';

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {!imgError ? (
        <div className={`relative overflow-hidden rounded-xl border ${
          variant === 'dark' 
            ? 'border-indigo-500/30 bg-slate-900 shadow-md shadow-indigo-950/40' 
            : 'border-slate-200 bg-white shadow-sm'
        } p-1 flex-shrink-0`}>
          <img
            src={logoSrc}
            alt="MESARA AI"
            className={`${sizeClasses[size]} object-contain rounded-lg`}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        /* Fallback placeholder if image fails to load */
        <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-extrabold shadow-sm flex-shrink-0`}>
          M
        </div>
      )}

      {showSubtitle && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight font-display ${
              variant === 'dark' ? 'text-white' : 'text-slate-900'
            } ${textClasses[size]}`}>
              MESARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">AI</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 border border-purple-500/20">
              Agency
            </span>
          </div>
          <span className={`text-[10px] tracking-wider uppercase font-semibold ${
            variant === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Smart Solutions. Limitless Possibilities.
          </span>
        </div>
      )}
    </div>
  );
};
