"use client";

import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/query-client";
import { AuthProvider } from "@/lib/auth/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryProvider>
  );
}
