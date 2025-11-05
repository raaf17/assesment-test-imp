// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { authService } from "@/lib/auth";
// import Navbar from "@/components/ui/Navbar";

// export default function DashboardLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const router = useRouter();

//     useEffect(() => {
//         if (!authService.isAuthenticated()) {
//             router.push("/login");
//         }
//     }, [router]);

//     if (!authService.isAuthenticated()) {
//         return null;
//     }

//     return (
//         <div className="min-h-screen bg-base-200">
//             <Navbar />
//             <main className="container mx-auto px-4 py-8">{children}</main>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";
import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Jalankan di client setelah mount
    const checkAuth = async () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      setIsAuthChecked(true);
      if (!auth) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  // Saat masih loading auth status, jangan render apa pun
  if (!isAuthChecked) return null;

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
