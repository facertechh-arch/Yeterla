import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Users } from "lucide-react";
import { YoklamaStatusDot } from "@/components/yoklama-status-dot";
import { getYoklamaStatus, type YoklamaRecord } from "@/lib/yoklama";

type YoklamaTableProps = {
  records: YoklamaRecord[];
};

export function YoklamaTable({ records }: YoklamaTableProps) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
        <Users className="mb-3 h-5 w-5 text-zinc-600" strokeWidth={1.5} />
        <p className="text-sm text-zinc-400">Henüz yoklama kaydı yok.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-zinc-800 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Kod Adı
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Telegram ID
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Son Yoklama
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Durum
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {records.map((record) => (
              <YoklamaTableRow key={record.telegram_id} record={record} />
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 md:hidden">
        {records.map((record) => (
          <YoklamaListItem key={record.telegram_id} record={record} />
        ))}
      </ul>
    </>
  );
}

function YoklamaTableRow({ record }: { record: YoklamaRecord }) {
  const sonYoklama = new Date(record.son_yoklama);
  const { status, label } = getYoklamaStatus(sonYoklama);
  const relativeTime = formatDistanceToNow(sonYoklama, {
    addSuffix: true,
    locale: tr,
  });

  return (
    <tr className="transition-colors hover:bg-zinc-900/40">
      <td className="px-4 py-3 font-medium text-zinc-100">{record.kod_adi}</td>
      <td className="px-4 py-3 font-mono text-xs text-zinc-400">
        {record.telegram_id}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-zinc-400">{relativeTime}</td>
      <td className="px-4 py-3">
        <YoklamaStatusDot status={status} label={label} />
      </td>
    </tr>
  );
}

function YoklamaListItem({ record }: { record: YoklamaRecord }) {
  const sonYoklama = new Date(record.son_yoklama);
  const { status, label } = getYoklamaStatus(sonYoklama);
  const relativeTime = formatDistanceToNow(sonYoklama, {
    addSuffix: true,
    locale: tr,
  });

  return (
    <li className="flex flex-col gap-2 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <span className="font-medium text-zinc-100">{record.kod_adi}</span>
        <YoklamaStatusDot status={status} label={label} />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-mono text-zinc-500">{record.telegram_id}</span>
        <span className="font-mono text-zinc-400">{relativeTime}</span>
      </div>
    </li>
  );
}
