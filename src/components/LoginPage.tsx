import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, ShieldCheck, Lock, ExternalLink, Key, Cpu, ShieldAlert } from "lucide-react";
import { Screen } from "../App";

interface LoginPageProps {
  onNavigate: (target: Screen) => void;
  onPasswordChange: (val: string) => void;
  passwordValue: string;
  onSetUserID: (id: string) => void;
  correctKey: string;
}

export default function LoginPage({ onNavigate, passwordValue, onPasswordChange, correctKey }: LoginPageProps) {
  const [onlineUsers, setOnlineUsers] = useState(1542);
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 21) - 10;
        const next = prev + change;
        return next < 1000 || next > 2000 ? prev : next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (passwordValue === "A1111" || (correctKey && passwordValue === correctKey)) {
      onNavigate("main");
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto px-6 py-6 bg-transparent relative overflow-hidden justify-between select-none">
      
      {/* Grid background for technical atmosphere */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 cyber-radial pointer-events-none" />

      {/* Floating security particles */}
      <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-emerald-500/20 blur-[1px] animate-ping pointer-events-none" />
      <div className="absolute bottom-1/4 right-12 w-3 h-3 rounded-full bg-emerald-500/10 blur-[2px] animate-pulse pointer-events-none" />

      {/* Error Alert Overlay */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ y: -60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.95 }}
            className="absolute top-6 left-6 right-6 z-[100] p-4 bg-red-950/90 border border-red-500/40 backdrop-blur-2xl rounded-2xl flex items-center gap-3.5 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <ShieldAlert className="w-5 h-5 text-red-400 animate-bounce" />
            </div>
            <div className="text-right flex-1">
              <h5 className="text-sm font-black text-white">خطأ في الرمز!</h5>
              <p className="text-[10px] text-red-300 font-medium">رمز الوصول المكتوب غير صالح، يرجى المحاولة مجدداً</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar - High-Tech Status Widget */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#06110d]/50 backdrop-blur-xl rounded-2xl border border-emerald-500/15">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse emerald-glow" />
          <span className="text-[10px] font-black text-emerald-400 font-orbitron uppercase tracking-wider">LIVE_GATEWAY</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[9px] text-white/40 block leading-none">المستخدمين النشطين</span>
            <span className="text-[12px] font-black font-mono text-white tracking-widest">{onlineUsers.toLocaleString()}</span>
          </div>
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Center authentication container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="my-auto py-8"
      >
        {/* Sleek App Branding */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full" />
          
          <img 
            src="https://cdn.phototourl.com/free/2026-07-18-da63e062-21e9-4c53-8e89-1966d3a044d4.png" 
            alt="Logo" 
            className="w-20 h-20 rounded-[1.5rem] object-cover mx-auto mb-4 border border-emerald-500/20 relative z-10 shadow-2xl"
          />

          <h2 className="text-3xl font-black font-orbitron tracking-[0.2em] text-center mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              GREENBET
            </span>
          </h2>
          <span className="text-[10px] font-black tracking-widest text-white/30 uppercase font-orbitron">SECURE AUTHORIZATION PLATFORM</span>
        </div>

        {/* Input & Form Area */}
        <div className="glass-premium rounded-[2.25rem] p-6 border border-emerald-500/15 relative overflow-hidden space-y-6">
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest text-right w-full block">
              مفتاح ترخيص المرور الآمن
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Key className="w-5 h-5 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="text"
                value={passwordValue}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="أدخل كود المرور الخاص بك (A1111)"
                className="w-full bg-obsidian/65 border border-white/10 rounded-2xl py-4.5 pr-12 pl-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all text-center font-mono text-xl font-bold tracking-widest uppercase shadow-inner"
              />
            </div>
            <p className="text-[10px] text-white/30 text-center font-medium leading-relaxed mt-1">
              أدخل كود الوصول المعتمد لتفعيل مصفوفة التنبؤ الرقمية
            </p>
          </div>

          {/* Submit Action */}
          <button 
            onClick={handleLogin}
            disabled={passwordValue.length === 0}
            className="w-full py-4.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-2xl font-black text-white text-base tracking-wide hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed group flex items-center justify-center gap-2.5 shadow-lg emerald-glow"
          >
            <span>فك تشفير لوحة التحكم</span>
            <ShieldCheck className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Metadata telemetry labels */}
          <div className="flex justify-between items-center text-[9px] font-mono font-bold text-white/25 pt-2 border-t border-white/5 uppercase">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-emerald-500/40" />
              AES_256_SSL
            </span>
            <span>ID STATUS: STANDBY</span>
          </div>

        </div>
      </motion.div>

      {/* Bottom Option - Get Passcode */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-5 bg-gradient-to-t from-[#06110d]/40 via-[#06110d]/10 to-transparent border border-white/5 rounded-3xl flex flex-col items-center gap-3 text-center"
      >
        <span className="text-xs text-white/40 font-semibold">ليس لديك رمز مرور نشط لغاية الآن؟</span>
        
        <button 
          onClick={() => onNavigate("condition")}
          className="flex flex-row-reverse items-center justify-center gap-2 px-8 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 font-black text-xs transition-all tracking-wider uppercase cursor-pointer"
        >
          <span>توليد وتنشيط رمز وصول VIP</span>
          <ExternalLink className="w-4 h-4 text-emerald-400" />
        </button>
      </motion.div>

    </div>
  );
}
