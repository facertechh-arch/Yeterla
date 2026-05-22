"use client";

import { useState } from "react";
import { TURKISH_CITIES, getRegionalLink } from "@/lib/regions";
import { supabase } from "@/lib/supabase";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function JoinForm() {
  const [nickname, setNickname] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regionalLink, setRegionalLink] = useState("");
  const [error, setError] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !city) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { error: dbError } = await supabase
        .from("members")
        .insert([{ nickname, city }]);

      if (dbError) {
        throw new Error(dbError.message);
      }

      setRegionalLink(getRegionalLink(city));
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError("Bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-sm animate-in fade-in duration-500 w-full max-w-md mx-auto">
        <h3 className="text-xl font-medium text-zinc-100 mb-2">Aramıza Hoş Geldin!</h3>
        <p className="text-zinc-400 text-sm mb-6 text-center">
          Bölgendeki diğer gençlerle tanışmak için Telegram grubuna katıl.
        </p>
        <a
          href={regionalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-900 font-medium rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 group w-full justify-center"
        >
          Bölgendeki Gruba Katıl
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleJoin}
      className="flex flex-col gap-4 p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-sm w-full max-w-md mx-auto"
    >
      <div className="space-y-1">
        <label htmlFor="nickname" className="text-sm font-medium text-zinc-400 text-left block">
          Takma Adın
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Anonim kalabilirsin..."
          required
          className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="city" className="text-sm font-medium text-zinc-400 text-left block">
          Şehrin
        </label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all appearance-none"
        >
          <option value="" disabled className="text-zinc-600">Şehir seç...</option>
          {TURKISH_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-left">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-900 font-medium rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Katılınıyor...
          </>
        ) : (
          "Bize Katıl"
        )}
      </button>
    </form>
  );
}
