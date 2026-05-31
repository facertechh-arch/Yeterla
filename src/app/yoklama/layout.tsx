import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yoklama | Yeter La",
  description: "Telegram yoklama izleme paneli",
  robots: { index: false, follow: false },
};

export default function YoklamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 font-[family-name:var(--font-geist-sans)] text-zinc-100">
      {children}
    </div>
  );
}
