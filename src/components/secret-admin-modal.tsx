"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Loader2, Lock, AlertTriangle, X } from "lucide-react";
import AdminDashboard from "@/components/admin-dashboard";
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

type SecretAdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SecretAdminModal({ isOpen, onClose }: SecretAdminModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isAuth);
    setAuthChecked(true);
    if (!isAuth) {
      setPasswordInput("");
      setErrorMsg("");
    }
  }, [isOpen]);

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
        setErrorMsg(data.error || "Erişim reddedildi. Geçersiz şifre.");
      }
    } catch {
      setErrorMsg("Bağlantı hatası. Tekrar dene.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl bg-black border-4 border-[#FF003C] shadow-[12px_12px_0px_#fff] p-6 md:p-8 relative max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="absolute top-0 left-0 bg-[#FF003C] text-black font-mono text-xs px-2 py-0.5 font-bold uppercase">
              SİSTEM KONTROL ODASI // ADMIN
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {!authChecked ? (
              <div className="flex justify-center py-20 mt-6">
                <Loader2 className="w-8 h-8 text-[#FF003C] animate-spin" />
              </div>
            ) : isAuthenticated ? (
              <div className="mt-6 overflow-y-auto flex-1 min-h-0 pr-1">
                <AdminDashboard />
              </div>
            ) : (
              <div className="mt-8 max-w-md mx-auto w-full space-y-6">
                <div className="space-y-2 text-center sm:text-left">
                  <h3
                    className={`${bebasNeue.className} text-3xl font-black text-white tracking-widest uppercase flex items-center gap-2 justify-center sm:justify-start`}
                  >
                    <Lock className="w-7 h-7 text-[#FF003C]" />
                    SİSTEM GİRİŞİ
                  </h3>
                  <p
                    className={`${spaceGrotesk.className} text-xs text-zinc-500 uppercase font-semibold`}
                  >
                    Supabase doğrulamalı yönetici alanı. Klavye: /-*0
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="secretAdminPassword"
                      className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest block"
                    >
                      Yönetici Şifresi
                    </label>
                    <div className="relative">
                      <input
                        id="secretAdminPassword"
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        disabled={isVerifying}
                        placeholder="••••••••••••••••"
                        className="w-full p-4 pl-12 bg-zinc-900 border-2 border-zinc-800 focus:border-[#FF003C] text-white rounded-none focus:outline-none transition-all placeholder:text-zinc-700 text-sm"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                        <KeyRound className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 border border-red-800 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase font-bold text-center flex items-center justify-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-3 text-lg bg-white text-black font-extrabold hover:bg-[#FF003C] hover:text-white disabled:opacity-50 transition-all font-mono uppercase cursor-pointer"
                  >
                    {isVerifying ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Doğrulanıyor...
                      </span>
                    ) : (
                      "Sisteme Giriş Yap"
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
