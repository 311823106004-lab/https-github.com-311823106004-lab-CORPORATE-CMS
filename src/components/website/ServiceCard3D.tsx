import React, { useState, useRef, useCallback } from 'react';
import { Service } from '../../types';
import {
  Globe,
  Layout,
  Smartphone,
  Bot,
  Cpu,
  Zap,
  BarChart2,
  Share2,
  Palette,
  Sparkles,
  GitBranch,
  Users,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Layers,
  Cloud,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Layout,
  Smartphone,
  Bot,
  Cpu,
  Zap,
  BarChart2,
  Share2,
  Palette,
  Sparkles,
  GitBranch,
  Users,
  ShoppingBag,
  TrendingUp,
  Layers,
  Cloud,
};

interface ServiceCard3DProps {
  service: Service;
  index: number;
  onExplore: (service: Service) => void;
}

export const ServiceCard3D: React.FC<ServiceCard3DProps> = ({ service, index, onExplore }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const IconComponent = ICON_MAP[service.iconName] || Globe;

  // Staggered distinct animation style patterns based on index
  const motionStyleVariant = index % 3;

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate smooth tilt angles (max +/- 12 degrees)
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Tactile touch tap handler
  const handleTouchEnd = () => {
    setTimeout(() => {
      setRotateX(0);
      setRotateY(0);
    }, 400);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        animationDelay: `${(index % 6) * 0.12}s`,
      }}
      className={`group relative rounded-3xl bg-slate-900 border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
        isHovered
          ? 'border-purple-500/70 shadow-2xl shadow-purple-950/50'
          : 'border-slate-800/80 shadow-slate-950/40'
      } ${
        motionStyleVariant === 0
          ? 'animate-[floatSlow_6s_ease-in-out_infinite]'
          : motionStyleVariant === 1
          ? 'animate-[floatAlt_7s_ease-in-out_infinite]'
          : 'animate-[floatSway_8s_ease-in-out_infinite]'
      }`}
    >
      {/* Dynamic 3D Glare Lighting Sheen */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(192, 132, 252, 0.35) 0%, rgba(99, 102, 241, 0.15) 35%, transparent 70%)`,
          }}
        />
      )}

      {/* Top Media Header with Category Badge and 3D Icon */}
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-slate-950">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-60 group-hover:opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          {/* Category Pill */}
          <div className="absolute top-3.5 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-500/30 text-[10px] font-extrabold uppercase tracking-wider text-purple-300 shadow-md">
              {service.category}
            </span>
          </div>

          {/* 3D Floating Interactive Icon Emblem */}
          <div
            style={{
              transform: isHovered ? 'translateZ(30px) scale(1.1)' : 'translateZ(0px) scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="absolute bottom-3 left-4 w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-xl flex items-center justify-center text-white"
          >
            <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-cyan-300 group-hover:rotate-6 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2 line-clamp-1 font-display">
            {service.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
            {service.description}
          </p>
        </div>
      </div>

      {/* Card Footer with Price and Action */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <div>
          {service.startingPrice && (
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Baseline Tier</span>
              <span className="text-sm font-extrabold text-cyan-300 font-display">
                {service.startingPrice}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => onExplore(service)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-200 hover:text-white text-xs font-bold transition-all shadow-sm group-hover:shadow-purple-900/40 cursor-pointer active:scale-95"
        >
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
