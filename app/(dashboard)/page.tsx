"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { templatesApi } from "@/lib/api/templates";
import { PageSkeleton, CardSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { ImageIcon, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["templates"],
    queryFn: () => templatesApi.list(),
  });

  if (isLoading) return <PageSkeleton />;
  if (error)
    return (
      <ErrorState
        message="Failed to load dashboard"
      />
    );

  const templates = data?.data.templates ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to Poster AI
        </p>
      </div>

        <Link
          href="/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-fit"
        >
          Create New Poster
          <ArrowRight className="h-4 w-4" />
        </Link>

      {templates.length === 0 ? (
        <EmptyState
          title="No templates available"
          description="Templates will appear here once they are added."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((tpl) => (
            <Link
              key={tpl._id}
              href={`/templates/${tpl._id}`}
              className="group rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-muted flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{tpl.titleBn}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {tpl.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
