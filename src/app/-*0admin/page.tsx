"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, KeyRound, Loader2, AlertTriangle } from "lucide-react";
import AdminPanel from "@/components/admin-panel";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export default function SecureAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Check if already logged in this session
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
    setLoadingInitial(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPassword = passwordInput.trim();

    if (!trimmedPassword) {
      setErrorMsg("Şifre boş bırakılamaz!");
      return;
    }

    setIsVerifying(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: trimmedPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("admin_authenticated", "true");
        setIsAuthenticated(true);
      } else {
        setErrorMsg(data.error || "Erişim Reddedildi! Geçersiz şifre.");
      }
    } catch (err) {
      setErrorMsg("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  if (loadingInitial) {
    return (
      <main className="min-h-screen bg-[#060608] text-white flex items-center justify-center font-mono">
        <Loader2 className="w-8 h-8 text-[#FF003C] animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-[#FF003C] selection:text-white flex flex-col relative overflow-hidden">
      
      {/* Brutalist Grid Overlay Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-45" />

      {/* Aggressive glowing accent gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF003C]/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-zinc-900/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="w-full max-w-5xl mx-auto z-10 px-6 pt-8 flex items-center justify-between select-none">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-400 hover:text-white border-2 border-transparent hover:border-zinc-800 bg-zinc-950 px-3 py-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>

        <span className="font-mono text-xs font-bold text-zinc-600 uppercase tracking-widest">
          SİSTEM KONTROL ODASI // ADMIN
        </span>
      </header>

      {/* Main Administrative Screen */}
      <div className="w-full max-w-4xl mx-auto z-10 px-6 py-12 flex-1 flex items-center justify-center">
        {isAuthenticated ? (
          <div className="w-full animate-fadeIn">
            <AdminPanel />
          </div>
        ) : (
          <div className="w-full max-w-md bg-black border-4 border-white shadow-[12px_12px_0px_#FF003C] p-8 relative overflow-hidden select-none">
            
            {/* Warning tag */}
            <div className="absolute top-0 left-0 bg-[#FF003C] text-black font-mono text-[10px] px-3 py-1 font-bold uppercase tracking-widest flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> GÜVENLİK DUVARI AKTİF
            </div>

            <div className="mt-4 text-center sm:text-left space-y-4">
              <h3 className={`${bebasNeue.className} text-4xl font-black text-white tracking-widest uppercase`}>
                SİSTEM GİRİŞİ
              </h3>
              <p className={`${spaceGrotesk.className} text-xs text-zinc-500 uppercase font-semibold border-b border-zinc-900 pb-4`}>
                Bu alan sadece yetkili inisiyatif yöneticilerine aittir. Erişim denemeleri kaydedilir.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 mt-6">
              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="adminPassword"
                  className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest block"
                >
                  Yönetici Şifresi
                </label>
                <div className="relative">
                  <input
                    id="adminPassword"
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    disabled={isVerifying}
                    placeholder="••••••••••••••••"
                    className="w-full p-4 pl-12 bg-zinc-900 border-2 border-zinc-800 focus:border-[#FF003C] text-white rounded-none focus:outline-none transition-all placeholder:text-zinc-700 font-sans text-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                    <KeyRound className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Error messages */}
              {errorMsg && (
                <div className="p-3 border border-red-800 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase font-bold text-center flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" /> {errorMsg}
                </div>
              )}

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-4 text-xl bg-white text-black font-extrabold rounded-none border-2 border-transparent hover:bg-[#FF003C] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[4px_4px_0px_#7f7f7f] active:shadow-none active:translate-y-1 cursor-pointer flex items-center justify-center gap-3 uppercase font-mono"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Doğrulanıyor...
                  </>
                ) : (
                  <>Sisteme Giriş Yap</>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full z-10 border-t-2 border-white py-8 px-6 bg-[#040405] text-zinc-700 text-center select-none">
        <span className="font-mono text-[10px] tracking-widest uppercase">
          © 2026 Yeter La // YÖNETİCİ GÜVENLİK ALANI // HER GÖREV KAYDEDİLMEKTEDİR.
        </span>
      </footer>
    </main>
  );
}
