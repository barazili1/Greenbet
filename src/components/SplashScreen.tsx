import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress loading to 100%
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 100);

    // Complete splash screen after completion
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-transparent relative overflow-hidden px-8 select-none">
      
      {/* Subtle background ambient lights */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xs flex flex-col items-center text-center space-y-8 z-10"
      >
        {/* Logo with clean glowing pulse effect */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-xl animate-pulse" />
          <div className="relative p-0.5 bg-gradient-to-tr from-emerald-500/30 to-emerald-400/10 rounded-[2rem] shadow-2xl">
            <img 
              src="https://cdn.phototourl.com/free/2026-07-18-da63e062-21e9-4c53-8e89-1966d3a044d4.png" 
              alt="Logo" 
              className="w-24 h-24 rounded-[1.85rem] object-cover border border-emerald-500/20"
            />
          </div>
        </div>

        {/* Beautiful Elegant Typographic Name */}
        <div className="space-y-1.5">
          <h2 className="text-3xl font-black tracking-wider text-white font-orbitron">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              GREENBET VIP
            </span>
          </h2>
          <span className="text-[9px] font-black tracking-[0.3em] text-white/30 uppercase font-orbitron block">
            SECURE PREDICTION HUB
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full space-y-2 pt-2">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[8px] font-mono font-bold text-white/20 uppercase tracking-widest">
            <span>LOADING MODULES</span>
            <span>{progress}%</span>
          </div>
        </div>

      </motion.div>

    </div>
  );
}
