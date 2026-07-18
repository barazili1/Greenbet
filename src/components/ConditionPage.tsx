import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  Copy, 
  Download, 
  Wallet, 
  User, 
  Image as ImageIcon, 
  ChevronRight,
  Loader2,
  RefreshCcw
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
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("A1111");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!userID) return;
    if (password !== "A1111") {
      setErrorMessage("كلمة مرور التفعيل غير صحيحة! تأكد من إدخال A1111");
      return;
    }
    
    setIsVerifying(true);
    setVerifyStatus("verifying");
    
    setTimeout(() => {
      onSetUserID(userID);
      setIsSubmitting(true);
      setIsVerifying(false);
      setVerifyStatus("success");
      
      setTimeout(() => {
        setIsSubmitting(false);
        onNavigate("main");
      }, 5000);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto bg-transparent overflow-hidden relative">
      <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 space-y-8 scrollbar-hide">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("login")} className="p-2 hover:bg-white/5 rounded-full ring-1 ring-white/10 transition-all">
            <RefreshCcw className="w-5 h-5 text-red-500" />
          </button>
          <h2 className="text-xl font-bold font-orbitron text-white/90">الشروط والاحكام</h2>
        </div>

      {/* 1. Installation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <span className="text-[10px] font-bold text-red-500">01</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">جاهزية النظام</h3>
        </div>
        <div 
          onClick={() => window.open("https://refpa79184.com/L?tag=d_5828346m_132250c_&site=5828346&ad=132250", "_blank", "noopener,noreferrer")}
          className="flex flex-row-reverse items-center justify-between p-4 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="flex flex-row-reverse items-center gap-3">
            <Download className="w-5 h-5 text-red-500 animate-bounce" />
            <span className="text-sm font-semibold uppercase">
              تحميل تطبيق greenbet
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20 rotate-180" />
        </div>
      </section>

      {/* 2. Promocode */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <span className="text-[10px] font-bold text-red-500">02</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">البروموكود VIP</h3>
        </div>
        <div className="relative group">
          <div className="p-1 glass rounded-2xl flex flex-row-reverse items-center gap-2 relative z-0 border-red-500/10">
            <div className="flex-1 py-4 pr-6 font-mono text-2xl font-black tracking-[0.2em] text-white text-right">
              A1111
            </div>
            <button 
              onClick={handleCopy}
              className={`ml-1 px-6 py-3 rounded-xl font-bold text-xs flex flex-row-reverse items-center gap-2 transition-all ${
                copied ? "bg-green-500 text-white" : "bg-red-600 text-white red-glow hover:brightness-110"
              }`}
            >
              {copied ? "تم النسخ" : "نسخ"}
            </button>
          </div>
          
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-red-600 rounded-2xl text-white font-black text-sm red-glow"
              >
                تم النسخ بنجاح
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Deposit Info */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <span className="text-[10px] font-bold text-red-500">03</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">متطلبات الاستثمار</h3>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-500/20 via-white/5 to-white/5 rounded-3xl border border-white/10 flex flex-row-reverse items-center justify-between">
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-bold text-white/40 uppercase">الحد الأدنى للإيداع</p>
            <p className="text-xl font-black text-white" dir="ltr">250 EGP <span className="text-red-500 mx-1">|</span> 5$</p>
          </div>
          <Wallet className="w-8 h-8 text-white/20" />
        </div>
      </section>

      {/* 4. ID Input */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <span className="text-[10px] font-bold text-red-500">04</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">تحديد الهوية</h3>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-white/20 group-focus-within:text-red-500" />
          </div>
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="أدخل الـ ID الخاص بك"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-red-500/50 transition-all font-mono text-right"
          />
        </div>
      </section>

      {/* 5. Password Verification */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <span className="text-[10px] font-bold text-red-500">05</span>
          </div>
          <h3 className="text-sm font-bold text-white/60 uppercase">كلمة مرور التفعيل</h3>
        </div>
        
        <div className="relative group">
          <input 
            type="text" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            placeholder="أدخل كلمة مرور التفعيل (A1111)"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-red-500/50 transition-all font-mono text-center"
          />
        </div>
        {errorMessage && (
          <p className="text-xs text-red-500 font-bold text-center mt-2">{errorMessage}</p>
        )}
      </section>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidian via-obsidian to-transparent border-t border-white/5 max-w-lg mx-auto z-[50]">
        <button 
          onClick={handleSubmit}
          disabled={!userID || !password || isVerifying}
          className="w-full py-5 bg-red-600 rounded-2xl font-black text-white red-glow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale uppercase"
        >
          {isVerifying ? "جاري التحقق من الرمز..." : "تفعيل الحساب والوصول"}
        </button>
      </div>

      {/* Progress Dialog */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass p-10 rounded-[3rem] border-red-500/20 flex flex-col items-center gap-8 shadow-2xl"
            >
              <div className="relative">
                 {/* Spinning Dragon/Gear substitute with complex SVG animate */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 text-red-500"
                >
                  <RefreshCcw className="w-full h-full stroke-[1px]" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://cdn.phototourl.com/free/2026-07-18-43d46ecc-bef3-4136-9a26-d9baabe0a6a6.jpg" 
                    alt="Logo" 
                    className="w-10 h-10 rounded-full object-cover relative z-10"
                  />
                  <div className="w-12 h-12 rounded-full bg-red-500 red-glow blur-[20px] absolute" />
                </div>
              </div>
              
              <div className="text-center space-y-4 max-w-[240px]">
                <h4 className="text-lg font-bold font-orbitron text-white">تفعيل الوصول جاري</h4>
                
                <div className="space-y-3">
                  {[
                    { label: "جاري فحص الـ ID ومزامنته", status: "checking" },
                    { label: "التحقق من كود التفعيل A1111", status: "pending" },
                    { label: "تأمين اتصال لوحة تحكم greenbet", status: "pending" },
                    { label: "بدء التوقع التلقائي المستمر", status: "pending" }
                  ].map((step, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 1 }}
                      className="flex flex-row-reverse items-center gap-3"
                    >
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          backgroundColor: ["rgba(220,38,38,0.2)", "rgba(220,38,38,0.5)", "rgba(220,38,38,0.2)"]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full"
                      />
                      <span className="text-[10px] font-bold text-white/60 uppercase text-right">{step.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <p className="text-[10px] text-white/30 font-bold uppercase flex items-center justify-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    تأمين الاتصال جاري...
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div> {/* End of flex-1 scrollable area */}
    </div>
  );
}
