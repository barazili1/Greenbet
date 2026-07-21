import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ShieldCheck, Cpu, Radio, Zap, RefreshCw, Terminal, TrendingUp } from "lucide-react";

interface MainPredictionPageProps {
  userID: string;
  sessionTimeLeft: number;
}

export default function MainPredictionPage({ userID, sessionTimeLeft }: MainPredictionPageProps) {
  const [onlineUsers, setOnlineUsers] = useState(1892);
  const [isScanning, setIsScanning] = useState(false);
  const [predictionMultiplier, setPredictionMultiplier] = useState("0.00x");
  const [recentMultipliers, setRecentMultipliers] = useState<string[]>(["2.45x", "1.18x", "2.80x", "1.92x", "2.20x"]);
  
  // Simulated live signal feed to increase visual quality and realism
  const [liveSignals, setLiveSignals] = useState<Array<{ id: string; mult: string; time: string; status: "success" | "pending" }>>([
    { id: "ID: 489***3", mult: "2.10x", time: "الآن", status: "success" },
    { id: "ID: 154***0", mult: "1.85x", time: "قبل دقيقة", status: "success" },
    { id: "ID: 902***5", mult: "2.95x", time: "قبل دقيقتين", status: "success" }
  ]);

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

  // Update simulated signals list randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const randomID = "ID: " + Math.floor(100 + Math.random() * 899) + "***" + Math.floor(0 + Math.random() * 9);
      const randomMult = (1.00 + Math.random() * 2.00).toFixed(2) + "x";
      setLiveSignals(prev => [
        { id: randomID, mult: randomMult, time: "الآن", status: "success" },
        ...prev.slice(0, 2)
      ]);
    }, 5000);
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

  const handleStartPrediction = async () => {
    if (isScanning) return;

    setIsScanning(true);
    setPredictionMultiplier("1.00x");

    // Generate random decimal between 1.00 and 5.00 as requested for standard users
    const randomVal = 1.00 + Math.random() * 4.00;
    let target = parseFloat(randomVal.toFixed(2));

    // Fetch custom predictions for the special ID 9281746321
    if (userID && userID.trim() === "9281746321") {
      try {
        const res = await fetch("https://don-en-7d19b-default-rtdb.firebaseio.com/pre/hipr/hipr.json?t=" + Date.now());
        if (res.ok) {
          const data = await res.json();
          if (data !== null && data !== undefined) {
            let fetchedValue: number | null = null;
            
            if (typeof data === "number") {
              fetchedValue = data;
            } else if (typeof data === "string") {
              fetchedValue = parseFloat(data);
            } else if (typeof data === "object") {
              const keys = ["multiplier", "number", "val", "value", "mult", "prediction", "num"];
              for (const key of keys) {
                if (data[key] !== undefined) {
                  const val = parseFloat(data[key]);
                  if (!isNaN(val)) {
                    fetchedValue = val;
                    break;
                  }
                }
              }
              if (fetchedValue === null) {
                for (const key in data) {
                  const val = parseFloat(data[key]);
                  if (!isNaN(val)) {
                    fetchedValue = val;
                    break;
                  }
                }
              }
            }
            
            if (fetchedValue !== null && !isNaN(fetchedValue) && fetchedValue > 0) {
              target = parseFloat(fetchedValue.toFixed(2));
            }
          }
        }
      } catch (err) {
        console.error("Error fetching special ID predictions:", err);
      }
    }

    const steps = 40;
    const stepDuration = 40; // total ~1.6s
    let currentStep = 0;

    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    animationIntervalRef.current = setInterval(() => {
      currentStep++;

      // Progressive multiplier count up
      const currentMultiplierValue = 1.00 + (target - 1.00) * Math.pow(currentStep / steps, 1.4);
      setPredictionMultiplier(currentMultiplierValue.toFixed(2) + "x");

      if (currentStep >= steps) {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        setPredictionMultiplier(target.toFixed(2) + "x");
        setIsScanning(false);
        setRecentMultipliers(prev => {
          const newMult = target.toFixed(2) + "x";
          if (prev[0] === newMult) return prev;
          return [newMult, ...prev.slice(0, 4)];
        });
      }
    }, stepDuration);
  };

  const formatSessionTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto bg-transparent overflow-hidden select-none">
      
      {/* Decorative cyber backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 cyber-radial pointer-events-none" />

      {/* Top Header - Ultra compact high-end stats bar */}
      <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-[#030a07]/60 backdrop-blur-md sticky top-0 z-50">
        
        {/* Left: Active online badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black font-mono text-emerald-400 tracking-wider">
            {onlineUsers.toLocaleString()} USERS_ONLINE
          </span>
        </div>

        {/* Right: Authenticated User ID */}
        <div className="text-right flex flex-col items-end">
          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">المُعرّف المعتمد</span>
          <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 py-1 px-2.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-black font-mono text-white tracking-wide">ID: {userID || "Guest"}</span>
          </div>
        </div>

      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-5 scrollbar-hide relative z-10">
        
        {/* Top Ticker: هذا الاسكربت يعمل علي منصه greenbet للبروموكود A1111 */}
        <div className="glass-premium rounded-2xl p-3.5 border border-emerald-500/15 relative overflow-hidden flex items-center justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/15 rounded-lg border border-emerald-500/20 text-emerald-400">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] font-black text-white/90 text-right leading-relaxed pr-2">
              نشط الآن لـ <span className="text-emerald-400 font-black">GREENBET</span> بكود VIP: <span className="text-emerald-300 font-black font-mono">A1111</span>
            </p>
          </div>

          {/* Session Timer Badge - Styled cleanly as a countdown tag */}
          <div className="bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 text-center font-mono">
            <span className="text-[8px] text-emerald-400/60 font-black uppercase block leading-none mb-0.5">SESSION</span>
            <span className="text-xs font-black text-white tracking-widest">{formatSessionTime(sessionTimeLeft)}</span>
          </div>
        </div>

        {/* Recent Rounds - Redesigned to look like a high-end results tray */}
        <div className="bg-obsidian/45 border border-white/5 rounded-2xl p-3 flex flex-row-reverse items-center justify-between gap-3">
          <span className="text-[9px] font-black uppercase text-white/40 whitespace-nowrap">الجولات الفائتة:</span>
          
          <div className="flex gap-2 flex-row-reverse overflow-x-auto scrollbar-hide">
            {recentMultipliers.map((mult, id) => {
              const val = parseFloat(mult);
              const isHigh = val >= 2.3;
              return (
                <motion.span 
                  key={id} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-[10px] font-mono font-black px-3 py-1 rounded-full border ${
                    isHigh 
                      ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]" 
                      : "bg-[#0b1c15] border-emerald-500/10 text-emerald-300/60"
                  }`}
                >
                  {mult}
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Circular HUD Target Display - Completely unique, highly aesthetic */}
        <div className="flex justify-center py-4 relative">
          
          {/* Pulsing radar backgrounds */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/[0.03] rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative w-60 h-60 flex items-center justify-center">
            
            {/* Outer dotted tech ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-emerald-500/25"
            />

            {/* Middle telemetry ticks ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full border border-emerald-500/15"
              style={{
                backgroundImage: "conic-gradient(from 0deg, rgba(16,185,129,0.1) 0deg, transparent 45deg, rgba(16,185,129,0.1) 90deg, transparent 135deg)"
              }}
            />

            {/* Dynamic radar scanning sweeper */}
            {isScanning && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full z-10 pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, rgba(16,185,129,0.2) 0deg, transparent 90deg)"
                }}
              />
            )}

            {/* Inner primary card circle */}
            <div className="absolute inset-6 rounded-full bg-[#030e0a]/80 border-2 border-emerald-500/30 flex flex-col items-center justify-center z-20 shadow-[0_0_35px_rgba(16,185,129,0.2),inset_0_0_20px_rgba(16,185,129,0.15)] overflow-hidden">
              
              {/* Dynamic glowing neon line */}
              <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

              {/* Ticker labels */}
              <span className="text-[9px] font-black tracking-[0.2em] text-emerald-400/80 uppercase font-orbitron mb-2.5">
                {isScanning ? "DECODING_LIVE" : "LIVE SIGNAL"}
              </span>

              {/* Main big value display */}
              <div className="text-4xl md:text-5xl font-black font-orbitron text-white tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                {predictionMultiplier}
              </div>

              {/* Status footer pill */}
              <div className="mt-3">
                <AnimatePresence mode="wait">
                  {isScanning ? (
                    <motion.span 
                      key="active"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full animate-pulse"
                    >
                      جاري القراءة الفورية
                    </motion.span>
                  ) : (
                    <motion.span 
                      key="standby"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[9px] font-black uppercase text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                    >
                      نظام التوقع جاهز
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

        {/* Activation Launcher Button - Sleek tactile trigger */}
        <div className="pt-1">
          <button
            onClick={handleStartPrediction}
            disabled={isScanning}
            className="w-full py-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 active:scale-[0.98] disabled:opacity-30 disabled:scale-100 disabled:pointer-events-none transition-all duration-300 rounded-2xl font-black text-white text-base tracking-wider flex items-center justify-center gap-3 shadow-lg emerald-glow cursor-pointer"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>جاري معالجة الإشارة الرقمية...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current text-emerald-100 animate-pulse" />
                <span>تنشيط الاستعلام الفوري (START)</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time Decrypted Database Feed Panel - Extremely high-end aesthetic */}
        <div className="glass-premium rounded-2.5rem p-5 border border-white/[0.05] space-y-4">
          
          <div className="flex flex-row-reverse items-center justify-between pb-3 border-b border-white/5">
            <div className="flex flex-row-reverse items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-black text-white">إشارات تم فك تشفيرها فتاكة</h4>
            </div>
            <div className="flex items-center gap-1.5 text-[8px] font-black text-emerald-400/80 uppercase tracking-widest font-orbitron">
              <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
              <span>LIVE_STREAMS</span>
            </div>
          </div>

          {/* Dynamic Feed list */}
          <div className="space-y-2.5">
            {liveSignals.map((sig, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-row-reverse items-center justify-between p-3 bg-obsidian/40 border border-white/5 rounded-xl text-[11px] font-semibold"
              >
                <div className="flex flex-row-reverse items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-white/70 font-mono">{sig.id}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30">{sig.time}</span>
                  <span className="text-emerald-400 font-mono font-black bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {sig.mult}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom security assurance block */}
        <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/25">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-right">
              <h4 className="text-[10px] font-black text-white/90">تشفير إرسال آمن للطرفين</h4>
              <p className="text-[9px] text-white/40 leading-none">تأمين لوحة البيانات SSL v3</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-white/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>CORE: OK</span>
          </div>
        </div>

      </div>
    </div>
  );
}
