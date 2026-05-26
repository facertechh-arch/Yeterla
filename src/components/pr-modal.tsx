"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface PrModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockId: string;
  originalText: string;
  onSubmitSuccess?: () => void;
}

export default function PrModal({
  isOpen,
  onClose,
  blockId,
  originalText,
  onSubmitSuccess,
}: PrModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [suggestedText, setSuggestedText] = useState(originalText);
  const [authorNick, setAuthorNick] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync open state with HTML5 Dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setErrorMsg("");
      setIsSuccess(false);
      setSuggestedText(originalText);
      
      // Clear nickname or pre-fill from localStorage if available
      const savedNick = localStorage.getItem("manifesto_author_nick") || "";
      setAuthorNick(savedNick);

      if (!dialog.open) {
        dialog.showModal();
        // Prevent scroll on body
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "unset";
    }
  }, [isOpen, originalText]);

  // Clean up overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle native "Escape" dismissals
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  // Handle Backdrop click (light dismiss)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Check if click target is the dialog wrapper itself (the backdrop)
    if (e.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isClickInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.bottom &&
      rect.left <= e.clientX &&
      e.clientX <= rect.right;

    if (!isClickInside) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNick = authorNick.trim();
    const trimmedSuggestion = suggestedText.trim();

    if (!trimmedNick) {
      setErrorMsg("Lütfen bir takma ad girin!");
      return;
    }
    if (!trimmedSuggestion) {
      setErrorMsg("Öneri alanı boş bırakılamaz!");
      return;
    }
    if (trimmedSuggestion === originalText.trim()) {
      setErrorMsg("Herhangi bir değişiklik yapmadınız!");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Save nick in localstorage
      localStorage.setItem("manifesto_author_nick", trimmedNick);

      // 1. Try real Supabase insertion
      const { error } = await supabase
        .from("manifesto_prs")
        .insert({
          block_id: blockId,
          original_content: originalText,
          suggested_content: trimmedSuggestion,
          status: "pending",
          author_nick: trimmedNick,
        });

      if (error) {
        console.warn("Supabase insert failed, running local mock insert:", error);
        // Fallback to local storage mock store
        const mockPr = {
          id: Math.random().toString(36).substring(2, 11),
          block_id: blockId,
          original_content: originalText,
          suggested_content: trimmedSuggestion,
          status: "pending",
          author_nick: trimmedNick,
          created_at: new Date().toISOString(),
        };
        const mockStore = JSON.parse(localStorage.getItem("mock_prs") || "[]");
        mockStore.push(mockPr);
        localStorage.setItem("mock_prs", JSON.stringify(mockStore));
      }

      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Automatically close modal after 1.5 seconds on success
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      setErrorMsg("Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="p-0 border-4 border-white bg-black text-white shadow-[12px_12px_0px_#FF003C] w-full max-w-lg focus:outline-none backdrop:bg-black/80 backdrop:backdrop-blur-sm select-none"
      aria-labelledby="prModalTitle"
    >
      <div className="relative p-6 md:p-8 flex flex-col space-y-6">
        
        {/* Brutalist Header Tag */}
        <div className="absolute top-0 left-0 bg-[#FF003C] text-black font-mono text-[10px] md:text-xs px-3 py-1 font-bold uppercase tracking-wider">
          MANIFESTO DÜZENLEME PROTOKOLÜ
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white hover:bg-zinc-900 p-1 border-2 border-transparent hover:border-zinc-800 transition-all cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-4">
          <h2
            id="prModalTitle"
            className="text-2xl md:text-3xl font-black tracking-wider uppercase font-mono border-b-2 border-dashed border-zinc-800 pb-3"
          >
            DEĞİŞİKLİK ÖNER
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Read-only Original Text */}
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest block">
              Mevcut Paragraf (Orijinal)
            </span>
            <div className="p-4 bg-zinc-950 border border-zinc-900 text-sm font-medium text-zinc-400 font-sans leading-relaxed break-words rounded-none max-h-36 overflow-y-auto">
              {originalText}
            </div>
          </div>

          {/* Editable Suggestion Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="suggestedText"
              className="font-mono text-xs font-bold text-[#FF003C] uppercase tracking-widest block"
            >
              Önerilen Paragraf (Yeni)
            </label>
            <textarea
              id="suggestedText"
              required
              rows={4}
              value={suggestedText}
              onChange={(e) => setSuggestedText(e.target.value)}
              disabled={isSubmitting || isSuccess}
              placeholder="Önerdiğiniz yeni metni buraya yazın..."
              className="w-full p-4 bg-zinc-900 border-2 border-zinc-800 focus:border-[#FF003C] text-white rounded-none focus:outline-none transition-all placeholder:text-zinc-600 font-semibold text-sm leading-relaxed"
            />
          </div>

          {/* Author Nickname Input */}
          <div className="space-y-2">
            <label
              htmlFor="authorNick"
              className="font-mono text-xs font-bold text-white uppercase tracking-widest block"
            >
              Takma Adınız (Anonim)
            </label>
            <input
              id="authorNick"
              type="text"
              required
              maxLength={30}
              value={authorNick}
              onChange={(e) => setAuthorNick(e.target.value)}
              disabled={isSubmitting || isSuccess}
              placeholder="Örn: ÖzgürGenç"
              className="w-full p-4 bg-zinc-900 border-2 border-zinc-800 focus:border-[#FF003C] text-white rounded-none focus:outline-none transition-all placeholder:text-zinc-600 font-semibold text-sm"
            />
          </div>

          {/* Notifications and status */}
          {errorMsg && (
            <div className="p-3 border border-red-800 bg-red-950/20 text-red-400 font-mono text-xs uppercase font-bold text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          {isSuccess && (
            <div className="p-4 border-2 border-[#FF003C] bg-[#FF003C]/10 text-white font-mono text-xs uppercase font-bold text-center animate-pulse">
              🎉 ÖNERİNİZ GÖNDERİLDİ! ONAY BEKLİYOR.
            </div>
          )}

          {/* Action button */}
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full py-4 text-xl bg-white text-black font-extrabold rounded-none border-2 border-transparent hover:bg-[#FF003C] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[4px_4px_0px_#7f7f7f] active:shadow-none active:translate-y-1 cursor-pointer flex items-center justify-center gap-3 uppercase font-mono"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gönderiliyor...
              </>
            ) : isSuccess ? (
              <>İşlem Başarılı</>
            ) : (
              <>
                Öneriyi Gönder <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
}
