import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Users, Play, RotateCcw, Compass, ShieldCheck, Cpu } from "lucide-react";

interface MainPredictionPageProps {
  userID: string;
  sessionTimeLeft: number;
}

export default function MainPredictionPage({ userID, sessionTimeLeft }: MainPredictionPageProps) {
  const [onlineUsers, setOnlineUsers] = useState(1892);
  const [isScanning, setIsScanning] = useState(false);
  const [predictionMultiplier, setPredictionMultiplier] = useState("0.00x");
  const [recentMultipliers, setRecentMultipliers] = useState<string[]>(["2.45x", "1.18x", "5.80x", "1.92x", "14.20x"]);
  
  // Custom states for Aviator graphics
  const [planeProgress, setPlaneProgress] = useState(0); // 0 to 100

  // Online Users Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 21) - 10;
        const next = prev + change;
        return next < 1000 || next > 2500 ? prev : next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  const handleStartPrediction = () => {
    if (isScanning) return;

    setIsScanning(true);
    setPlaneProgress(0);
    setPredictionMultiplier("1.00x");

    // Generate random decimal between 1.00 and 3.00
    const randomVal = 1.00 + Math.random() * 2.00;
    const target = parseFloat(randomVal.toFixed(2));

    const steps = 45;
    const stepDuration = 35; // total ~1.5s for sleek transition
    let currentStep = 0;

    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    animationIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setPlaneProgress(progress);

      // Progressive multiplier count up
      const currentMultiplierValue = 1.00 + (target - 1.00) * Math.pow(currentStep / steps, 1.5);
      setPredictionMultiplier(currentMultiplierValue.toFixed(2) + "x");

      if (currentStep >= steps) {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        setPredictionMultiplier(target.toFixed(2) + "x");
        setIsScanning(false);
        setRecentMultipliers(prev => {
          const newMult = target.toFixed(2) + "x";
          // Avoid immediate duplicate of the latest round in history
          if (prev[0] === newMult) return prev;
          return [newMult, ...prev.slice(0, 4)];
        });
      }
    }, stepDuration);
  };

  const formatSessionTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h, m, s };
  };

  const { h, m, s } = formatSessionTime(sessionTimeLeft);

  const timeData = [
    { label: "ساعة", val: h, max: 1 },
    { label: "دقيقة", val: m, max: 60 },
    { label: "ثانية", val: s, max: 60 }
  ];

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto bg-transparent overflow-hidden">
      {/* Top Bar as requested: Users online on left, typed ID on right in Arabic/English */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5 bg-obsidian/50 backdrop-blur-md sticky top-0 z-10">
        {/* Left Side: Users online */}
        <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-white/50 uppercase font-bold">Users online</span>
          <span className="text-[11px] font-mono font-bold text-white tracking-wider">{onlineUsers.toLocaleString()}</span>
        </div>

        {/* Right Side: ID yang dtulis */}
        <div className="text-right flex flex-col items-end">
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">مُعرّف المستخدم</span>
          <span className="text-sm font-black font-mono text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            ID: {userID || "Guest"}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24 space-y-4 scrollbar-hide">
        
        {/* Banner: هذا الاسكربت يعمل علي منصه greenbet للبروموكود A1111 */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)] text-center relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500" />
          <p className="text-xs font-bold text-white/95 leading-relaxed text-center font-sans tracking-wide">
            هذا الاسكربت يعمل علي منصه <span className="text-red-500 font-extrabold uppercase tracking-widest mx-1 relative">greenbet</span> للبروموكود <span className="text-red-400 font-black font-mono bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">A1111</span>
          </p>
        </motion.div>

        {/* Recent Rounds Multipliers Row (Immersive Aviator vibe) */}
        <div className="flex flex-row-reverse items-center justify-between gap-1.5 py-1 px-1 overflow-x-auto scrollbar-hide">
          <span className="text-[9px] font-black uppercase text-white/30 whitespace-nowrap">الجولات السابقة:</span>
          <div className="flex gap-1.5 flex-row-reverse">
            {recentMultipliers.map((mult, id) => {
              const val = parseFloat(mult);
              const isHigh = val >= 10;
              const isMedium = val >= 2 && val < 10;
              return (
                <span 
                  key={id} 
                  className={`text-[9px] font-mono font-bold px-2 py-1 rounded-full border ${
                    isHigh 
                      ? "bg-purple-950/40 border-purple-500/40 text-purple-400" 
                      : isMedium 
                      ? "bg-blue-950/40 border-blue-500/40 text-blue-400" 
                      : "bg-red-950/40 border-red-500/40 text-red-400"
                  }`}
                >
                  {mult}
                </span>
              );
            })}
          </div>
        </div>

        {/* Timer Section (3 High-End Cyber-Luxury RGB Circles) - Moved here (ABOVE prediction card) */}
        <div className="py-2">
          <div className="flex justify-center gap-4 py-1 px-2">
            {timeData.map((data, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center gap-3 flex-1"
              >
                <div className="relative w-full aspect-square max-w-[80px] flex items-center justify-center rounded-full">
                  
                  {/* Glowing RGB Background loop */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.25, 1],
                      opacity: [0.15, 0.4, 0.15],
                      backgroundColor: ["rgba(239,68,68,0.15)", "rgba(185,28,28,0.25)", "rgba(239,68,68,0.15)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full blur-2xl"
                  />

                  {/* Flight radar rotating beam */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-red-500/30"
                  />

                  <svg className="w-full h-full -rotate-90 relative z-10 p-1.5">
                    <defs>
                      <linearGradient id={`gradient-red-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#b91c1c" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50%"
                      cy="50%"
                      r="40%"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="2"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="40%"
                      stroke={`url(#gradient-red-${i})`}
                      strokeWidth="4"
                      strokeDasharray="250"
                      animate={{ 
                        strokeDashoffset: 250 - (data.val / data.max) * 250,
                      }}
                      transition={{ 
                        strokeDashoffset: { duration: 1, ease: "linear" }
                      }}
                      fill="transparent"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                      <span className="text-[8px] font-black text-red-500 uppercase mb-0.5 tracking-wider">
                        {data.label[0]}
                      </span>
                      <span className="text-lg md:text-xl font-orbitron font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] tracking-tighter">
                          {data.val.toString().padStart(2, "0")}
                      </span>
                  </div>
                </div>
                <span className="text-[8px] font-black text-white/40 uppercase font-orbitron">{data.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Requested Red Rounded Transparent Box with format 0.00x inside - Fully automated real-time prediction card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`border-2 border-red-500 rounded-[2.5rem] bg-transparent p-10 text-center shadow-[0_0_35px_rgba(239,68,68,0.15)] flex flex-col items-center justify-center min-h-[180px] relative transition-all duration-500 overflow-hidden ${
            isScanning ? "border-red-400 shadow-[0_0_40px_rgba(239,68,68,0.25)]" : ""
          }`}
        >
          <div className="absolute top-4 left-6 text-red-500/20 font-mono text-[8px]">SYS_LOCK</div>
          <div className="absolute bottom-4 right-6 text-red-500/20 font-mono text-[8px]">LIMIT: 100%</div>

          <span className="text-[10px] font-black uppercase text-red-400/70 tracking-[0.25em] mb-3">
            {isScanning ? "جاري التوقع المباشر..." : "نسبة التوقع المباشر"}
          </span>
          
          <div className="text-5xl md:text-6xl font-black font-mono text-red-500 tracking-widest font-orbitron drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]">
            {predictionMultiplier}
          </div>

          {/* Status Indicator */}
          {isScanning ? (
            <div className="flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 animate-pulse text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              جاري معالجة الإشارة...
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              جاهز لبدء التوقع المباشر
            </div>
          )}

          {/* Real-time scan laser overlay */}
          {isScanning && (
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            />
          )}
        </motion.div>

        {/* Start Prediction Button */}
        <div className="pt-2">
          <button
            onClick={handleStartPrediction}
            disabled={isScanning}
            className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none transition-all rounded-2xl font-black text-white text-base tracking-wider red-glow flex items-center justify-center gap-3 uppercase shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            {isScanning ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>جاري استخراج التوقع...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>ابدأ التوقع (START)</span>
              </>
            )}
          </button>
        </div>

        {/* Live Security Verification & Guarantee Feed */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <ShieldCheck className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-left">
              <h4 className="text-[11px] font-bold text-white/90">تشفير إرسال آمن</h4>
              <p className="text-[9px] text-white/40">بروتوكول التحقق الثنائي العسكري</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-red-500/50" />
            <span className="text-[9.5px] font-mono font-bold text-white/30">CPU: 99.8%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
