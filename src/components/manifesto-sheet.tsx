"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ManifestoSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ManifestoSheet({ isOpen, onClose, children }: ManifestoSheetProps) {
  // Listen for Escape key to close the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Disable scrolling on body
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm cursor-pointer hidden md:block"
          />

          {/* Sliding Sheet Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-[#09090b] border-l-4 border-white shadow-[-10px_0_40px_rgba(255,0,60,0.15)] z-50 flex flex-col hidden md:flex select-none"
          >
            {/* Sheet Banner Accent */}
            <div className="w-full bg-[#FF003C] py-1 text-black font-mono text-[9px] font-bold uppercase tracking-widest text-center px-4">
              SİSTEM MANİFESTO PANELİ // GÜVENLİ BAĞLANTI AKTİF
            </div>

            {/* Header Area */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <h3 className="font-mono text-2xl font-black uppercase text-white tracking-widest">
                MANIFESTO
              </h3>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white hover:bg-zinc-900 p-1.5 border-2 border-transparent hover:border-zinc-800 transition-all cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {children}
            </div>
            
            {/* Footer decoration */}
            <div className="p-4 border-t border-zinc-900 bg-black/45 text-center font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
              Yeter La Gençlik İnisiyatifi // 2026
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
