"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-extrabold text-muted-foreground mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go Home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
