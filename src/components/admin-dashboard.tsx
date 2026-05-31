"use client";

import { useState } from "react";
import { Activity, FileText, Users } from "lucide-react";
import AdminPanel from "@/components/admin-panel";
import YoklamaPanel from "@/components/yoklama-panel";
import MembersPanel from "@/components/members-panel";
import { cn } from "@/lib/utils";

type AdminTab = "members" | "yoklama" | "manifesto";

const tabs: { id: AdminTab; label: string; icon: typeof Users }[] = [
  { id: "members", label: "Üyeler", icon: Users },
  { id: "yoklama", label: "Yoklama", icon: Activity },
  { id: "manifesto", label: "Manifesto PR", icon: FileText },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("yoklama");

  return (
    <div className="w-full space-y-6">
      <nav className="flex flex-wrap gap-2 border-b-2 border-zinc-800 pb-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[2px]",
              activeTab === id
                ? "border-[#FF003C] text-white bg-zinc-900/60"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Icon className="w-4 h-4" strokeWidth={2} />
            {label}
          </button>
        ))}
      </nav>

      {activeTab === "members" && <MembersPanel />}
      {activeTab === "yoklama" && <YoklamaPanel />}
      {activeTab === "manifesto" && <AdminPanel />}
    </div>
  );
}
