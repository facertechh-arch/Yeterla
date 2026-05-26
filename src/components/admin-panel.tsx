"use client";

import { useEffect, useState } from "react";
import { Check, X, Loader2, RefreshCw, Trash2, Database } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ManifestoPr {
  id: string;
  block_id: string;
  original_content: string;
  suggested_content: string;
  status: "pending" | "approved" | "rejected";
  author_nick: string;
  created_at: string;
}

interface ManifestoBlock {
  id: string;
  order_index: number;
  content: string;
}

const DEFAULT_MOCK_BLOCKS = [
  {
    id: "block-1",
    order_index: 0,
    content: "BİZİ KURTARACAK BİR ANA MUHALEFET YOK. Siyasetin köhne yüzleri gençliğin çığlığını duymamakta direniyor, koltuklarını ve kendi konforlu statükolarını koruma derdindeler. Değişim yukarıdan gelmeyecek."
  },
  {
    id: "block-2",
    order_index: 1,
    content: "İKTİDARIN BİZİ SÜRÜKLEDİĞİ O KARANLIK, SESSİZ DİKTATÖRLÜGE GİRMEMİZE ÇOK AZ KALDI. Her geçen gün sansürleniyor, haklarımızdan ve özgürlüklerimizden taviz vermeye zorlanıyoruz. Sessiz kalmak suça ortak olmaktır."
  },
  {
    id: "block-3",
    order_index: 2,
    content: "EĞER BUGÜN KENDİ MERKEZİDİSİ (DECENTRALIZED) DİJİTAL VE FİZİKSEL AĞLARIMIZI KURMAZSAK, 100 YILLIK CUMHURİYETİN ÇÖKÜŞÜNÜ İZLEYEN KORKAK VE ACİZ BİR NESİL OLACAĞIZ. Kendi geleceğimizi kimsenin lütfuna bırakamayız."
  },
  {
    id: "block-4",
    order_index: 3,
    content: "ŞİKAYET ETMEYİ BIRAK, BİR ARAYA GEL. Harekete geçmek ve değişimi yerelden, kendi mahallemizden, kendi okulumuzdan başlatmak için örgütleniyoruz. Bu platform, geleceğimizi ortak akılla yeniden yazma aracıdır."
  }
];

const DEFAULT_MOCK_PRS: ManifestoPr[] = [
  {
    id: "pr-mock-1",
    block_id: "block-1",
    original_content: "BİZİ KURTARACAK BİR ANA MUHALEFET YOK. Siyasetin köhne yüzleri gençliğin çığlığını duymamakta direniyor, koltuklarını ve kendi konforlu statükolarını koruma derdindeler. Değişim yukarıdan gelmeyecek.",
    suggested_content: "BİZİ KURTARACAK BİR ANA MUHALEFET YOK! Siyasetin köhne ve çürümüş yüzleri gençliğin çığlığını duymamakta ısrar ediyor, koltuklarını koruma derdindeler. Değişim sokaktan, biz gençlerden başlayacak.",
    status: "pending",
    author_nick: "HürGenç",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: "pr-mock-2",
    block_id: "block-3",
    original_content: "EĞER BUGÜN KENDİ MERKEZİDİSİ (DECENTRALIZED) DİJİTAL VE FİZİKSEL AĞLARIMIZI KURMAZSAK, 100 YILLIK CUMHURİYETİN ÇÖKÜŞÜNÜ İZLEYEN KORKAK VE ACİZ BİR NESİL OLACAĞIZ. Kendi geleceğimizi kimsenin lütfuna bırakamayız.",
    suggested_content: "EĞER BUGÜN KENDİ MERKEZSİZLEŞTİRİLMİŞ (DECENTRALIZED) DİJİTAL VE EYLEM AĞLARIMIZI KURMAZSAK, 100 YILLIK CUMHURİYETİN YIKILIŞINI SEYREDEN KORKAK BİR JENERASYON OLACAĞIZ. Kendi geleceğimizi ortak akılla inşa etmeliyiz.",
    status: "pending",
    author_nick: "AsilRebel",
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  }
];

// Simple word-by-word diff engine to build beautiful high contrast visual diffs
function renderWordDiff(original: string, suggested: string) {
  const originalWords = original.split(" ");
  const suggestedWords = suggested.split(" ");

  const origSet = new Set(suggestedWords.map(w => w.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")));
  const sugSet = new Set(originalWords.map(w => w.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")));

  const originalDiff = originalWords.map((word, i) => {
    const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const isDeleted = !origSet.has(cleanWord) && cleanWord.length > 1;
    return (
      <span
        key={`del-${i}`}
        className={
          isDeleted
            ? "bg-red-500/25 text-red-200 line-through px-1 rounded-sm mx-0.5 inline-block"
            : "mx-0.5 inline-block"
        }
      >
        {word}
      </span>
    );
  });

  const suggestedDiff = suggestedWords.map((word, i) => {
    const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const isAdded = !sugSet.has(cleanWord) && cleanWord.length > 1;
    return (
      <span
        key={`add-${i}`}
        className={
          isAdded
            ? "bg-emerald-500/25 text-emerald-200 font-extrabold px-1 rounded-sm mx-0.5 inline-block border border-emerald-500/40"
            : "mx-0.5 inline-block"
        }
      >
        {word}
      </span>
    );
  });

  return { originalDiff, suggestedDiff };
}

export default function AdminPanel() {
  const [prs, setPrs] = useState<ManifestoPr[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [isUsingMock, setIsUsingMock] = useState(false);

  const fetchPrs = async () => {
    setLoading(true);
    try {
      if (supabase && typeof supabase.from === "function") {
        const { data, error } = await supabase
          .from("manifesto_prs")
          .select("*")
          .eq("status", "pending")
          .order("created_at", { ascending: false });

        if (data && !error) {
          setPrs(data);
          setIsUsingMock(false);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Supabase fetch failed for PRs, falling back to mock database:", err);
    }

    // Mock storage fallback
    const savedPrs = localStorage.getItem("mock_prs");
    if (savedPrs) {
      const parsed = JSON.parse(savedPrs) as ManifestoPr[];
      setPrs(parsed.filter(pr => pr.status === "pending"));
    } else {
      setPrs(DEFAULT_MOCK_PRS);
      localStorage.setItem("mock_prs", JSON.stringify(DEFAULT_MOCK_PRS));
    }
    setIsUsingMock(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrs();
  }, []);

  const handleApprove = async (pr: ManifestoPr) => {
    setActioningId(pr.id);
    try {
      if (!isUsingMock) {
        // Real Supabase approval update
        const { error } = await supabase
          .from("manifesto_prs")
          .update({ status: "approved" })
          .eq("id", pr.id);

        if (!error) {
          // Success! Dynamic trigger handles updating manifesto_blocks in database
          await fetchPrs();
          setActioningId(null);
          return;
        }
        console.warn("Supabase approval failed, falling back to mock store:", error);
      }

      // Local Mock Approval Flow
      // 1. Mark PR as approved
      const savedPrs = JSON.parse(localStorage.getItem("mock_prs") || "[]") as ManifestoPr[];
      const updatedPrs = savedPrs.map(p => (p.id === pr.id ? { ...p, status: "approved" as const } : p));
      localStorage.setItem("mock_prs", JSON.stringify(updatedPrs));

      // 2. Update manifesto block text in mock storage
      const savedBlocks = JSON.parse(
        localStorage.getItem("mock_manifesto_blocks") || JSON.stringify(DEFAULT_MOCK_BLOCKS)
      ) as ManifestoBlock[];
      
      const updatedBlocks = savedBlocks.map(block => {
        // Match block_id. Handle mock references as well.
        const isMatch = block.id === pr.block_id || 
                        (pr.block_id === "block-1" && block.order_index === 0) ||
                        (pr.block_id === "block-2" && block.order_index === 1) ||
                        (pr.block_id === "block-3" && block.order_index === 2) ||
                        (pr.block_id === "block-4" && block.order_index === 3);

        if (isMatch) {
          return { ...block, content: pr.suggested_content };
        }
        return block;
      });
      localStorage.setItem("mock_manifesto_blocks", JSON.stringify(updatedBlocks));
      
      // Dispatch a storage event so that the ManifestoView component updates instantly!
      window.dispatchEvent(new Event("storage"));

      await fetchPrs();
    } catch (err) {
      console.error("Approval error:", err);
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (prId: string) => {
    setActioningId(prId);
    try {
      if (!isUsingMock) {
        // Real Supabase update
        const { error } = await supabase
          .from("manifesto_prs")
          .update({ status: "rejected" })
          .eq("id", prId);

        if (!error) {
          await fetchPrs();
          setActioningId(null);
          return;
        }
      }

      // Mock update
      const savedPrs = JSON.parse(localStorage.getItem("mock_prs") || "[]") as ManifestoPr[];
      const updatedPrs = savedPrs.map(p => (p.id === prId ? { ...p, status: "rejected" as const } : p));
      localStorage.setItem("mock_prs", JSON.stringify(updatedPrs));

      await fetchPrs();
    } catch (err) {
      console.error("Rejection error:", err);
    } finally {
      setActioningId(null);
    }
  };

  const resetMockData = () => {
    localStorage.removeItem("mock_prs");
    localStorage.removeItem("mock_manifesto_blocks");
    window.dispatchEvent(new Event("storage"));
    fetchPrs();
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-zinc-800 pb-6 gap-4">
        <div>
          <h2 className="font-mono text-3xl font-black uppercase text-white tracking-wider">
            ONAY PANELİ
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wide mt-1 flex items-center gap-1.5">
            {isUsingMock ? (
              <span className="text-[#FF003C] font-bold flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> MOCK MAHALLE AĞI AKTİF
              </span>
            ) : (
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> CANLI VERİTABANI BAĞLANTISI
              </span>
            )}
            // Gelen değişiklik önerilerini denetleyin
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPrs}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-white transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Yenile
          </button>
          
          {isUsingMock && (
            <button
              onClick={resetMockData}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold bg-red-950/20 border border-red-950/50 text-red-400 hover:bg-red-900 hover:text-white transition-all cursor-pointer"
              title="Test verilerini ilk ayarlarına sıfırlar"
            >
              <Trash2 className="w-3.5 h-3.5" /> Sıfırla
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-12 h-12 text-[#FF003C] animate-spin" />
          <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase animate-pulse">
            ÖNERİLER YÜKLENİYOR...
          </span>
        </div>
      ) : prs.length === 0 ? (
        <div className="border-4 border-dashed border-zinc-800 p-12 text-center">
          <p className="font-mono text-sm text-zinc-500 uppercase tracking-widest">
            📭 İNCELENECEK HİÇBİR BEKLEYEN DEĞİŞİKLİK ÖNERİSİ YOK.
          </p>
          <p className="text-xs text-zinc-700 font-mono uppercase mt-2">
            Öneri göndermek için ana sayfadan Manifesto sekmelerini açıp &quot;Düzenle&quot; moduna girin.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {prs.map((pr, index) => {
            const { originalDiff, suggestedDiff } = renderWordDiff(
              pr.original_content,
              pr.suggested_content
            );

            return (
              <div
                key={pr.id}
                className="bg-black border-2 border-zinc-800 shadow-[6px_6px_0px_rgba(255,255,255,0.05)] p-5 md:p-6 space-y-6 relative hover:border-[#FF003C]/60 transition-all duration-300"
              >
                
                {/* Metadata info */}
                <div className="flex flex-wrap items-center justify-between text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-950 pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF003C] bg-white px-2 py-0.5 text-black">
                      Öneri #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span>Öneren: <strong className="text-white">@{pr.author_nick}</strong></span>
                  </div>
                  <span>Tarih: {new Date(pr.created_at).toLocaleString("tr-TR")}</span>
                </div>

                {/* Diff Viewer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column - Original Content (Red tint for deletions) */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Çıkarılan Metin (Eski)
                    </span>
                    <div className="p-4 bg-red-950/10 border border-red-950/40 text-sm leading-relaxed text-zinc-400 font-sans break-words min-h-[120px] rounded-none">
                      {originalDiff}
                    </div>
                  </div>

                  {/* Right Column - Suggested Content (Green tint for additions) */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Eklenen Metin (Yeni)
                    </span>
                    <div className="p-4 bg-emerald-950/15 border border-emerald-950/40 text-sm leading-relaxed text-zinc-200 font-sans font-medium break-words min-h-[120px] rounded-none">
                      {suggestedDiff}
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-end gap-4 border-t border-zinc-950 pt-4">
                  <button
                    disabled={actioningId !== null}
                    onClick={() => handleReject(pr.id)}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-extrabold bg-zinc-950 border border-red-900/60 text-red-400 hover:bg-red-950 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    {actioningId === pr.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}{" "}
                    Reddet
                  </button>

                  <button
                    disabled={actioningId !== null}
                    onClick={() => handleApprove(pr)}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-extrabold bg-white text-black border border-black hover:bg-emerald-500 hover:text-black transition-all shadow-[3px_3px_0px_#FF003C] hover:shadow-none cursor-pointer disabled:opacity-50"
                  >
                    {actioningId === pr.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}{" "}
                    Onayla & Birleştir (Merge)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
