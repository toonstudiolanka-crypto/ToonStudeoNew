import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Toon Studio",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPanel />;
}
