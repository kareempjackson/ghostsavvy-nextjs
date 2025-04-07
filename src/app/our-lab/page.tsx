import { redirect } from "next/navigation";

export default function LegacyLabPage() {
  redirect("/savvy-lab");
  return null;
}
