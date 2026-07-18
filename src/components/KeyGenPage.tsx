import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Lock, LogIn, Cpu, ShieldCheck } from "lucide-react";
import { Screen } from "../App";

interface KeyGenPageProps {
  onNavigate: (target: Screen) => void;
  onCopyKey: (key: string) => void;
  timeLeft: number;
}

export default function KeyGenPage({ onNavigate, onCopyKey }: KeyGenPageProps) {
  const [key, setKey] = useState("");

  useEffect(() => {
    const genPart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    setKey(`${genPart()}-${genPart()}-${genPart()}-${genPart()}`);
  }, []);

  const handleLogin = () => {
    onCopyKey(key);
    onNavigate("login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-transparent relative overflow-hidden px-6 select-none">
      
      {/* Decorative cyber grid and lighting */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 cyber-radial pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-sm glass-premium p-8 rounded-[2.5rem] border border-emerald-500/20 shadow-2xl space-y-8 text-center"
      >
        {/* Core security indicator */}
        <div className="space-y-3">
          <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            {/* Spinning decorative frame */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-2xl border border-dashed border-emerald-500/40"
            />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
              <Lock className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-white leading-none">توليد رمز الترخيص VIP</h2>
          <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">SECURE LICENSE ISSUED</p>
        </div>

        {/* The Key Box - Redesigned to look extremely high-end */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-emerald-500/20 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="relative bg-obsidian/70 p-6 rounded-2xl border border-emerald-500/15 text-center space-y-3.5 shadow-inner">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.25em] block">
              مفتاح الوصول السحابي الفريد
            </span>
            
            <div className="flex items-center justify-center py-2.5 px-1 bg-white/[0.02] border border-white/5 rounded-xl">
              <h3 className="text-lg font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-200 tracking-widest break-all drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                {key}
              </h3>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-emerald-400/60 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>مرخص ومعتمد للاستخدام الفوري</span>
            </div>
          </div>
        </div>

        {/* Warning info */}
        <p className="text-[10px] text-white/40 font-semibold uppercase leading-relaxed px-3">
          تم تشفير هذا المفتاح على سيرفر GREENBET وبمجرد الدخول سيتم تفعيل جلستك VIP لمدة 15 دقيقة كاملة.
        </p>

        {/* Next button */}
        <button 
          onClick={handleLogin}
          className="w-full py-4.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 rounded-2xl font-black text-white text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden active:scale-[0.98] cursor-pointer shadow-lg emerald-glow"
        >
          <span>نسخ المفتاح والانتقال للدخول</span>
          <LogIn className="w-5 h-5 text-emerald-100" />
        </button>

        {/* Fine print status */}
        <div className="flex justify-between items-center text-[9px] font-mono font-bold text-white/20 pt-1 uppercase">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-emerald-500/20" />
            SECURE_KEYGEN
          </span>
          <span>100% SECURED</span>
        </div>

      </motion.div>
    </div>
  );
}
