"use client";

import { useState } from "react";
import { Loader2, Edit3, Eye, FileEdit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useManifestoBlocks } from "@/hooks/use-manifesto-blocks";
import PrModal from "./pr-modal";

export default function ManifestoView() {
  const { blocks, loading, refresh } = useManifestoBlocks();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<{
    id: string;
    content: string;
  } | null>(null);

  return (
    <div className="w-full flex flex-col space-y-8 select-none">
      <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse" />
          <span className="font-mono text-xs font-black tracking-widest text-zinc-500 uppercase">
            MİSYON & MANİFESTO
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsEditMode((v) => !v)}
          className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold border-2 cursor-pointer transition-all duration-300 ${
            isEditMode
              ? "bg-[#FF003C] border-transparent text-white shadow-[3px_3px_0px_#fff] -translate-y-0.5"
              : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-white"
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
            manifesto yükleniyor...
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
              <div className="font-mono text-[10px] text-zinc-600 font-bold mb-3 uppercase tracking-wider flex justify-between items-center">
                <span>// paragraf {String(index + 1).padStart(2, "0")}</span>
                {isEditMode && (
                  <span className="text-[#FF003C] animate-pulse">düzenlenebilir</span>
                )}
              </div>

              <p className="font-sans text-sm md:text-base leading-relaxed text-zinc-300 font-medium whitespace-pre-wrap">
                {block.content}
              </p>

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
                      type="button"
                      onClick={() =>
                        setSelectedBlock({ id: block.id, content: block.content })
                      }
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold font-mono bg-white text-black hover:bg-[#FF003C] hover:text-white border-2 border-black transition-all shadow-[3px_3px_0px_#FF003C] hover:shadow-[3px_3px_0px_#fff] active:translate-y-0.5 cursor-pointer uppercase"
                    >
                      <FileEdit className="w-3.5 h-3.5" /> değişiklik öner
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      <div className="bg-zinc-950 border border-zinc-900 p-4 font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide leading-relaxed">
        {isEditMode ? (
          <span className="text-[#FF003C] font-bold">
            Düzenleme modundasın — paragrafların altından öneri gönderebilirsin. Onaylanınca metin burada güncellenir.
          </span>
        ) : (
          <span>
            Manifesto ortaklaşa yazılıyor. Katkı için sağ üstten düzenle&apos;ye bas.
          </span>
        )}
      </div>

      <PrModal
        isOpen={selectedBlock !== null}
        onClose={() => setSelectedBlock(null)}
        blockId={selectedBlock?.id ?? ""}
        originalText={selectedBlock?.content ?? ""}
        onSubmitSuccess={() => refresh()}
      />
    </div>
  );
}
