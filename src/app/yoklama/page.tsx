import { redirect } from "next/navigation";

export default function YoklamaPage() {
  redirect("/?admin=1");
}
