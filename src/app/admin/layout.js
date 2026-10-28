import { AdminDataProvider } from "@/context/AdminDataContext";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "Admin Dashboard | Peak Housing Kenya",
  description: "Administrative control center for Peak Housing property catalog and contractors.",
};

export const instant = false;


export default function AdminLayout({ children }) {
  return (
    <AdminDataProvider>
      <AdminShell>{children}</AdminShell>
    </AdminDataProvider>
  );
}
