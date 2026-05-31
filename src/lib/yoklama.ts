import { supabase } from "@/lib/supabase";

export type YoklamaRecord = {
  telegram_id: number;
  kod_adi: string;
  son_yoklama: string;
};

export type YoklamaStatus = "active" | "warning" | "inactive";

export type YoklamaStatusInfo = {
  status: YoklamaStatus;
  label: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function getYoklamaStatus(sonYoklama: Date): YoklamaStatusInfo {
  const diffMs = Date.now() - sonYoklama.getTime();

  if (diffMs < DAY_MS) {
    return { status: "active", label: "Aktif / Admin Adayı" };
  }
  if (diffMs <= 3 * DAY_MS) {
    return { status: "warning", label: "Uyarı / Danışma Kurulu" };
  }
  return { status: "inactive", label: "Pasif / Genel" };
}

export async function fetchYoklamaRecords(): Promise<YoklamaRecord[]> {
  const { data, error } = await supabase
    .from("yoklama")
    .select("telegram_id, kod_adi, son_yoklama")
    .order("son_yoklama", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as YoklamaRecord[];
}
