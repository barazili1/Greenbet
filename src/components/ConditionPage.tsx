import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  Copy, 
  Download, 
  Wallet, 
  User, 
  ChevronRight,
  Loader2,
  RefreshCcw,
  ShieldCheck,
  Cpu,
  Smartphone,
  Gift,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Server,
  Key
} from "lucide-react";
import { Screen } from "../App";

interface ConditionPageProps {
  onNavigate: (target: Screen) => void;
  onSetUserID: (id: string) => void;
}

export default function ConditionPage({ onNavigate, onSetUserID }: ConditionPageProps) {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  // Dynamic status feedback for user input completion
  useEffect(() => {
    if (userID && password === "A1111") {
      setActiveStep(5);
    } else if (userID) {
      setActiveStep(4);
    } else {
      setActiveStep(3);
    }
  }, [userID, password]);

  const handleCopy = () => {
    navigator.clipboard.writeText("A1111");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!userID) return;
    if (password !== "A1111") {
      setErrorMessage("رمز الأمان للتفعيل غير صحيح! تأكد من إدخال A1111");
      return;
    }
    
    setIsVerifying(true);
    
    setTimeout(() => {
      onSetUserID(userID);
      setIsSubmitting(true);
      setIsVerifying(false);
      
      setTimeout(() => {
        setIsSubmitting(false);
        onNavigate("main");
      }, 5000);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto bg-transparent overflow-hidden relative select-none">
      
      {/* Decorative cyber grid and lighting */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 cyber-radial pointer-events-none" />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Top Header Navigation - Sleek control header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-500/10 bg-[#030a07]/50 backdrop-blur-xl sticky top-0 z-50">
        <button 
          onClick={() => onNavigate("login")} 
          className="p-2.5 bg-white/[0.02] hover:bg-emerald-500/10 rounded-full border border-white/5 hover:border-emerald-500/20 transition-all flex items-center justify-center cursor-pointer group"
        >
          <ChevronRight className="w-5 h-5 text-emerald-400 rotate-180 group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="text-right">
          <h2 className="text-lg font-black text-white flex items-center gap-2 justify-end">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">تنشيط الترخيص VIP</span>
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          </h2>
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.25em]">SECURE SYSTEM INTEGRATION</p>
        </div>
      </div>

      {/* Main scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-12 space-y-6 scrollbar-hide relative z-10">
        
        {/* Intro banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-emerald-950/5 to-transparent border border-emerald-500/15 flex flex-row-reverse items-center gap-3.5">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <p className="text-xs text-white/70 text-right leading-relaxed font-medium">
            يرجى إتمام الخطوات التالية بدقة عالية لتفعيل ترخيص حسابك والبدء في استعراض إشارات التنبؤ الفورية.
          </p>
        </div>

        {/* Step 1: Download App */}
        <div className={`glass-premium rounded-[2rem] p-5 border transition-all duration-300 space-y-4 relative overflow-hidden ${
          activeStep >= 1 ? "border-emerald-500/20 shadow-[0_4px_25px_rgba(16,185,129,0.04)]" : "border-white/5 opacity-60"
        }`}>
          {/* Subtle decoration lines */}
          <div className="absolute right-0 top-0 w-24 h-[1px] bg-gradient-to-l from-emerald-500/30 to-transparent" />
          
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm font-black text-emerald-400 font-mono shadow-inner">
                01
              </div>
              <h3 className="text-sm font-black text-white">تهيئة تطبيق منصة GREENBET</h3>
            </div>
            <span className="text-[9px] font-black tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">
              أساسي
            </span>
          </div>

          <p className="text-xs text-white/50 text-right leading-relaxed font-medium">
            تأكد من تحميل تطبيق الأخضر لتتمكن الخوارزمية من الارتباط الآمن ومزامنة الإشارات بشكل مستمر وسلس على هاتفك.
          </p>

          <button 
            onClick={() => window.open("https://refpa79184.com/L?tag=d_5828346m_188307c_&site=5828346&ad=188307", "_blank", "noopener,noreferrer")}
            className="w-full flex flex-row-reverse items-center justify-between p-4 bg-emerald-500/5 hover:bg-emerald-500/10 active:scale-[0.99] rounded-2xl border border-emerald-500/20 cursor-pointer transition-all duration-300 group"
          >
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-white block leading-tight">
                  تنزيل وتثبيت تطبيق GREENBET الرسمى
                </span>
                <span className="text-[10px] text-white/40 font-medium">مستقر بنسبة 100% | آمن تماماً</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-emerald-400 animate-bounce" />
          </button>
        </div>

        {/* Step 2: Promo Code */}
        <div className={`glass-premium rounded-[2rem] p-5 border transition-all duration-300 space-y-4 relative overflow-hidden ${
          activeStep >= 2 ? "border-emerald-500/20 shadow-[0_4px_25px_rgba(16,185,129,0.04)]" : "border-white/5 opacity-60"
        }`}>
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm font-black text-emerald-400 font-mono shadow-inner">
                02
              </div>
              <h3 className="text-sm font-black text-white">بروموكود الترخيص السحابي</h3>
            </div>
            <span className="text-[9px] font-black tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">
              برومو VIP
            </span>
          </div>

          <p className="text-xs text-white/50 text-right leading-relaxed font-medium">
            انسخ كود المكافأة النشط وضعه أثناء تهيئة الحساب للحصول على التفعيل المجاني التام وتأمين حزم البث المباشر.
          </p>

          <div className="relative group">
            <div className="bg-[#030d09]/80 p-1.5 rounded-2xl flex flex-row-reverse items-center gap-2 border border-emerald-500/15">
              <div className="flex-1 py-2 pr-4 font-mono text-2xl font-black tracking-[0.25em] text-emerald-300 text-right drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                A1111
              </div>
              <button 
                onClick={handleCopy}
                className={`px-6 py-4.5 rounded-xl font-black text-xs flex flex-row-reverse items-center gap-2 transition-all duration-300 cursor-pointer ${
                  copied 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "bg-emerald-600 hover:bg-emerald-500 text-white emerald-glow"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-emerald-100" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Deposit Requirements */}
        <div className={`glass-premium rounded-[2rem] p-5 border transition-all duration-300 space-y-4 relative overflow-hidden ${
          activeStep >= 3 ? "border-emerald-500/20 shadow-[0_4px_25px_rgba(16,185,129,0.04)]" : "border-white/5 opacity-60"
        }`}>
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm font-black text-emerald-400 font-mono shadow-inner">
                03
              </div>
              <h3 className="text-sm font-black text-white">تنشيط الإيداع الأول</h3>
            </div>
            <span className="text-[9px] font-black tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">
              قيمة الشحن
            </span>
          </div>

          <p className="text-xs text-white/50 text-right leading-relaxed font-medium">
            اشحن رصيد حسابك للمرة الأولى بالحد الأدنى المطلوب لتأكيد ربط الحساب بالسيرفر وتثبيت الترخيص:
          </p>

          <div className="p-4 bg-gradient-to-l from-emerald-500/10 via-[#030d09]/50 to-transparent rounded-2xl border border-emerald-500/20 flex flex-row-reverse items-center justify-between">
            <div className="text-right">
              <p className="text-[8px] font-black text-emerald-400/60 uppercase tracking-wider mb-0.5">قيمة الإيداع لتفعيل النظام</p>
              <p className="text-lg font-black text-white font-mono" dir="ltr">
                250 EGP <span className="text-emerald-500 font-bold mx-1">|</span> 5$
              </p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Step 4: Account ID */}
        <div className={`glass-premium rounded-[2rem] p-5 border transition-all duration-300 space-y-4 relative overflow-hidden ${
          userID ? "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.06)]" : "border-emerald-500/15"
        }`}>
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm font-black text-emerald-400 font-mono shadow-inner">
                04
              </div>
              <h3 className="text-sm font-black text-white">ربط كود الـ ID الخاص بك</h3>
            </div>
            <span className="text-[9px] font-black tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">
              خطوة الربط
            </span>
          </div>

          <p className="text-xs text-white/50 text-right leading-relaxed font-medium">
            اكتب الرقم التعريفي (ID) الخاص بحسابك الجديد على التطبيق لتوثيقه كحساب VIP وتخزينه في الخادم.
          </p>

          <div className="relative group">
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-10">
              <User className="w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              placeholder="مثال: 5828346"
              className="w-full bg-[#030d09]/80 border border-emerald-500/15 focus:border-emerald-500/40 rounded-2xl py-4.5 pr-12 pl-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all font-mono text-right font-black text-base shadow-inner relative z-0"
            />
          </div>
        </div>

        {/* Step 5: Activation Key */}
        <div className={`glass-premium rounded-[2rem] p-5 border transition-all duration-300 space-y-4 relative overflow-hidden ${
          password === "A1111" ? "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)]" : "border-emerald-500/15"
        }`}>
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm font-black text-emerald-400 font-mono shadow-inner">
                05
              </div>
              <h3 className="text-sm font-black text-white">رمز الأمان للتفعيل</h3>
            </div>
            <span className="text-[9px] font-black tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">
              رمز المرور
            </span>
          </div>

          <p className="text-xs text-white/50 text-right leading-relaxed font-medium">
            تأكيد الاتصال والمزامنة النهائية عبر كتابة الكود الافتراضي للتفعيل <span className="text-emerald-400 font-extrabold">A1111</span> بالأسفل.
          </p>

          <div className="relative group">
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-10">
              <Key className="w-5 h-5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input 
              type="text" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              placeholder="اكتب الرمز هنا (A1111)"
              className="w-full bg-[#030d09]/80 border border-emerald-500/15 focus:border-emerald-500/40 rounded-2xl py-4.5 pr-12 pl-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all font-mono text-center font-black text-base shadow-inner relative z-0"
            />
          </div>
          {errorMessage && (
            <p className="text-xs text-red-400 font-bold text-center mt-1">{errorMessage}</p>
          )}
        </div>

        {/* Action Button - Moved inside the scrollable content at the bottom */}
        <div className="pt-4 pb-2">
          <button 
            onClick={handleSubmit}
            disabled={!userID || !password || isVerifying}
            className="w-full py-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-2xl font-black text-white text-base tracking-wide transition-all duration-300 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed group flex items-center justify-center gap-2.5 shadow-xl emerald-glow cursor-pointer"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>جاري توثيق حزم الاتصال...</span>
              </>
            ) : (
              <>
                <span>إرسال وتفعيل الترخيص VIP</span>
                <ShieldCheck className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Advanced Fullscreen Verification Progress overlay - Absolute masterpiece design */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            
            {/* Holographic scanner line going down */}
            <motion.div 
              animate={{ y: ["0dvh", "100dvh"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] pointer-events-none"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative glass-premium p-8 rounded-[2.5rem] border border-emerald-500/30 flex flex-col items-center gap-8 shadow-[0_0_80px_rgba(16,185,129,0.25)] max-w-sm w-full"
            >
              <div className="relative">
                {/* Rotating holographic high-tech circles */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="w-28 h-28 text-emerald-500/25 border-2 border-dashed border-emerald-500 rounded-full"
                />
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 text-emerald-400/20 border border-emerald-500/40 rounded-full"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://cdn.phototourl.com/free/2026-07-18-da63e062-21e9-4c53-8e89-1966d3a044d4.png" 
                    alt="Logo loader" 
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/40 shadow-2xl relative z-10"
                  />
                  <div className="w-16 h-16 rounded-full bg-emerald-500/30 emerald-glow-heavy blur-[20px] absolute z-0" />
                </div>
              </div>
              
              <div className="text-center space-y-4 w-full">
                <div>
                  <h4 className="text-xl font-black text-white tracking-wide">جاري التوثيق وتأمين الاتصال</h4>
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-1">SECURE BACKEND VERIFICATION</p>
                </div>
                
                {/* Simulated stages of registration with actual dynamic ticks and timelines */}
                <div className="space-y-3 bg-[#030d09]/90 p-5 rounded-2xl border border-emerald-500/10">
                  {[
                    { label: "موازنة الرقم التعريفي ID وتثبيته", delay: 0 },
                    { label: "التحقق المباشر من الكود الرقمي A1111", delay: 1.2 },
                    { label: "تأمين منفذ الاستقبال بقفل SSL التام", delay: 2.5 },
                    { label: "بث نظام التوقع التلقائي الفوري", delay: 3.8 }
                  ].map((step, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: step.delay }}
                      className="flex flex-row-reverse items-center justify-between text-[11px]"
                    >
                      <span className="font-bold text-white/80 text-right">{step.label}</span>
                      
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: step.delay + 0.8 }}
                          className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[8px]"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3px]" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-black uppercase tracking-wide">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>برجاء الانتظار، يجري التهيئة التامة...</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/20">PORT: 3000 // AES_SSL_v3</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
