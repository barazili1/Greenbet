import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, ShieldCheck, Lock, ExternalLink, Activity } from "lucide-react";
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
    }, 1000);
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
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto px-6 py-8 bg-transparent relative overflow-hidden">
      {/* Error Alert Overlay */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-6 left-6 right-6 z-[100] p-4 bg-red-500/20 border border-red-500/50 backdrop-blur-xl rounded-2xl flex items-center gap-3"
          >
            <Lock className="w-5 h-5 text-red-500" />
            <span className="text-white font-bold text-sm">خطأ في الكود! تأكد من الكود المكتوب</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10 sm:mb-16 px-4 py-3 glass rounded-2xl border-red-500/10">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-red-500" />
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50 uppercase leading-none">المستخدمين الآن</span>
            <motion.span 
              key={onlineUsers}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-sm font-mono font-bold text-white leading-none"
            >
              {onlineUsers.toLocaleString()}
            </motion.span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-2.5 rounded-full bg-red-500 red-glow"
          />
          <span className="text-xs font-bold text-white/80">الحالة: نشط</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-red-500/20 blur-[30px] opacity-40 rounded-full" />
          <img 
            src="https://cdn.phototourl.com/free/2026-07-18-43d46ecc-bef3-4136-9a26-d9baabe0a6a6.jpg" 
            alt="Logo" 
            className="w-20 h-20 rounded-2xl object-cover relative z-10 border border-red-500/20 mx-auto drop-shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-5xl font-black font-orbitron tracking-tighter text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-red-500 to-red-400 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">GREENBET</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/40 uppercase ml-1 text-right w-full block">كلمة المرور الآمنة</label>
            <div className="relative group">
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-white/20 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                type="password"
                value={passwordValue}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="أدخل كود الوصول"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-right"
              />
            </div>
          </div>

          <button 
            onClick={handleLogin}
            disabled={passwordValue.length === 0}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl font-bold text-white red-glow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group flex items-center justify-center gap-2"
          >
            تسجيل الدخول للنظام
            <ShieldCheck className="w-5 h-5 group-hover:animate-pulse" />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-4 py-8 border-t border-white/5"
      >
        <p className="text-sm text-white/40">ليس لديك كلمة مرور؟</p>
        <button 
          onClick={() => onNavigate("condition")}
          className="flex flex-row-reverse items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-red-500 font-bold text-sm transition-all"
        >
          احصل على كلمة المرور
          <ExternalLink className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
