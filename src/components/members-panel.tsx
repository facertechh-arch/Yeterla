"use client";

import { useCallback, useEffect, useState } from "react";
import { Database, Loader2, RefreshCw, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Member = { nickname: string; city: string };

export default function MembersPanel() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUsingMock, setIsUsingMock] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      if (supabase && typeof supabase.from === "function") {
        const { data, error } = await supabase
          .from("members")
          .select("nickname, city")
          .order("id", { ascending: false });

        if (data && !error) {
          setMembers(data);
          setIsUsingMock(false);
          setLoading(false);
          return;
        }
      }
    } catch {
      // fall through to mock
    }

    setMembers([
      { nickname: "AsilRebel", city: "İstanbul" },
      { nickname: "VatanSever", city: "Ankara" },
      { nickname: "HürGenç", city: "İzmir" },
      { nickname: "YeterArtık", city: "Bursa" },
    ]);
    setIsUsingMock(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-zinc-800 pb-4 gap-4">
        <div>
          <h2 className="font-mono text-2xl font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Users className="w-6 h-6 text-[#FF003C]" strokeWidth={2} />
            KAYITLI ÜYELER
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wide mt-1">
            {isUsingMock ? (
              <span className="text-[#FF003C] font-bold">MOCK VERİ</span>
            ) : (
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <Database className="w-3.5 h-3.5 inline" /> CANLI VERİTABANI
              </span>
            )}
            {" "}// Katılım formu kayıtları
          </p>
        </div>
        <button
          type="button"
          onClick={fetchMembers}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-white transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Yenile
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-10 h-10 text-[#FF003C] animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <p className="text-center py-8 font-mono text-xs text-zinc-600 uppercase">
          Kayıtlı kullanıcı bulunamadı.
        </p>
      ) : (
        <div className="border border-zinc-800 bg-zinc-950/40 divide-y divide-zinc-800 max-h-[50vh] overflow-y-auto">
          <div className="flex bg-zinc-900/60 font-mono text-[10px] font-bold uppercase text-zinc-500 py-2 px-3 sticky top-0">
            <div className="w-1/2">Takma Ad</div>
            <div className="w-1/2">Şehir</div>
          </div>
          {members.map((m, idx) => (
            <div
              key={`${m.nickname}-${idx}`}
              className="flex py-2.5 px-3 hover:bg-zinc-900/30 transition-colors font-mono text-xs"
            >
              <div className="w-1/2 text-white font-bold break-all">{m.nickname}</div>
              <div className="w-1/2 text-zinc-300">{m.city}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
