"use client";

import { useEffect, useState } from "react";
import { Loader2, Edit3, Eye, FileEdit } from "lucide-react";
import { supabase } from "@/lib/supabase";
import PrModal from "./pr-modal";
import { motion, AnimatePresence } from "framer-motion";

interface ManifestoBlock {
  id: string;
  order_index: number;
  content: string;
}

const INITIAL_MOCK_BLOCKS: ManifestoBlock[] = [
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

export default function ManifestoView() {
  const [blocks, setBlocks] = useState<ManifestoBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Suggestion Modal State
  const [selectedBlock, setSelectedBlock] = useState<ManifestoBlock | null>(null);

  const fetchBlocks = async () => {
    try {
      if (supabase && typeof supabase.from === "function") {
        const { data, error } = await supabase
          .from("manifesto_blocks")
          .select("*")
          .order("order_index", { ascending: true });

        if (data && data.length > 0 && !error) {
          setBlocks(data);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Supabase fetch error, using mockup fallback", err);
    }

    // Local Storage Mock fallback to enable simulation
    const savedBlocks = localStorage.getItem("mock_manifesto_blocks");
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    } else {
      setBlocks(INITIAL_MOCK_BLOCKS);
      localStorage.setItem("mock_manifesto_blocks", JSON.stringify(INITIAL_MOCK_BLOCKS));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlocks();

    // Listen to local changes (in case mock is updated in other tabs or panels)
    const handleStorageChange = () => {
      const savedBlocks = localStorage.getItem("mock_manifesto_blocks");
      if (savedBlocks) {
        setBlocks(JSON.parse(savedBlocks));
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Listen to real-time changes in Supabase
    let channel: any;
    if (supabase && typeof supabase.channel === "function") {
      channel = supabase
        .channel("manifesto_blocks_live_updates")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "manifesto_blocks",
          },
          () => {
            fetchBlocks();
          }
        )
        .subscribe();
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      if (channel && supabase && typeof supabase.removeChannel === "function") {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const handlePrSubmitted = () => {
    // PR was submitted successfully, we can refresh just in case
    fetchBlocks();
  };

  return (
    <div className="w-full flex flex-col space-y-8 select-none">
      
      {/* Manifesto Sub-header Control Bar */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse" />
          <span className="font-mono text-xs font-black tracking-widest text-zinc-500 uppercase">
            MİSYON & MANİFESTO
          </span>
        </div>
        
        {/* EDIT MODE TOGGLER */}
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold border-2 cursor-pointer transition-all duration-300 ${
            isEditMode
              ? "bg-[#FF003C] border-transparent text-white shadow-[3px_3px_0px_#fff] -translate-y-0.5"
              : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-white shadow-none"
          }`}
        >
          {isEditMode ? (
            <>
              <Eye className="w-3.5 h-3.5" /> GÖRÜNÜM MODU
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5" /> DÜZENLE
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-[#FF003C] animate-spin" />
          <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest animate-pulse">
            MANİFESTO YÜKLENİYOR...
          </span>
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative border-2 p-5 transition-all duration-300 ${
                isEditMode
                  ? "border-[#FF003C]/40 bg-zinc-950/40 hover:border-[#FF003C] hover:bg-zinc-950/90"
                  : "border-zinc-900 bg-transparent hover:border-zinc-800"
              }`}
            >
              {/* Paragraph Metadata Tag */}
              <div className="font-mono text-[10px] text-zinc-600 font-bold mb-3 uppercase tracking-wider flex justify-between items-center">
                <span>// PARAGRAF {String(index + 1).padStart(2, "0")}</span>
                {isEditMode && (
                  <span className="text-[#FF003C] animate-pulse">AKTİF DEĞİŞİKLİK ALANI</span>
                )}
              </div>

              {/* Content Paragraph Text */}
              <p className="font-sans text-sm md:text-base leading-relaxed text-zinc-300 font-medium whitespace-pre-wrap">
                {block.content}
              </p>

              {/* SUGGEST CHANGE TRIGGER BUTTON */}
              <AnimatePresence>
                {isEditMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden flex justify-end"
                  >
                    <button
                      onClick={() => setSelectedBlock(block)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold font-mono bg-white text-black hover:bg-[#FF003C] hover:text-white border-2 border-black transition-all shadow-[3px_3px_0px_#FF003C] hover:shadow-[3px_3px_0px_#fff] active:shadow-none active:translate-y-0.5 cursor-pointer uppercase"
                    >
                      <FileEdit className="w-3.5 h-3.5" /> ✏️ Değişiklik Öner
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info helper text */}
      <div className="bg-zinc-950 border border-zinc-900 p-4 font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide leading-relaxed">
        💡 {isEditMode ? (
          <span className="text-[#FF003C] font-bold">
            DÜZENLEME MODU AKTİF! Paragrafların altındaki düğmeleri kullanarak değişiklik önerisi gönderebilirsiniz. Önerileriniz admin onayından geçtikten sonra canlı manifesto güncellenecektir.
          </span>
        ) : (
          <span>
            BU MANİFESTO GENÇLİĞİN ORTAK AKLIYLA SÜREKLİ GÜNCELLENİR. Katkıda bulunmak için sağ üstteki &quot;Düzenle&quot; butonuna basarak değişiklik önerilerinizi gönderebilirsiniz.
          </span>
        )}
      </div>

      {/* Suggestion Dialog Render */}
      <PrModal
        isOpen={selectedBlock !== null}
        onClose={() => setSelectedBlock(null)}
        blockId={selectedBlock?.id || ""}
        originalText={selectedBlock?.content || ""}
        onSubmitSuccess={handlePrSubmitted}
      />
    </div>
  );
}
