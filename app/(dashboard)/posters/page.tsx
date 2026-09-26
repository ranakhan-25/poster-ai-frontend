"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postersApi, Poster } from "@/lib/api/posters";
import { PageSkeleton, CardSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  Trash2,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  ImageIcon,
  Download,
} from "lucide-react";
import { toast } from "sonner";

const PAGE_SIZE = 6;

export default function PostersPage() {
  const [search, setSearch] = useState("");
  const [occasionType, setOccasionType] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-posters", page, search, occasionType],
    queryFn: () =>
      postersApi.listMy(page, search, occasionType),
  });

  const posters = (data?.data.posters ?? []).map((p: Poster) => ({
    ...p,
    templateId: String(p.templateId),
    _id: String(p._id),
  }));

  const totalPages = data?.data.pagination?.totalPages ?? 1;

  const deletePoster = async (id: string) => {
    setDeleting(id);
    try {
      await postersApi.delete(id);
      toast.success("Poster deleted");
      queryClient.invalidateQueries({ queryKey: ["my-posters"] });
    } catch {
      toast.error("Failed to delete poster");
    } finally {
      setDeleting(null);
    }
  };

  const regenerate = async (id: string) => {
    try {
      const res = await postersApi.regenerate(id);
      toast.success("Regeneration started");
      queryClient.invalidateQueries({ queryKey: ["my-posters"] });
      // Poll for completion
      pollStatus(id);
    } catch {
      toast.error("Failed to regenerate");
    }
  };

  const pollStatus = useCallback(
    async (id: string, attempts = 0) => {
      if (attempts > 30) return;
      await new Promise((r) => setTimeout(r, 2000));
      try {
        const res = await postersApi.getById(id);
        const status = (res.data as { poster: Poster }).poster.status;
        if (status === "generating") {
          pollStatus(id, attempts + 1);
        } else {
          queryClient.invalidateQueries({
            queryKey: ["my-posters"],
          });
        }
      } catch {
        // ignore
      }
    },
    [queryClient]
  );

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "generating":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Posters</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your posters
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search posters..."
            className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={occasionType}
            onChange={(e) => {
              setOccasionType(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">All Occasions</option>
            <option value="victory_day">Victory Day</option>
            <option value="tribute">Tribute</option>
            <option value="campaign">Campaign</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState message="Failed to load posters" />
      ) : posters.length === 0 ? (
        <EmptyState
          title="No posters yet"
          description="Create your first poster to see it here."
          action={{
            label: "Create Poster",
            onClick: () => (window.location.href = "/posters/new"),
          }}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posters.map((poster: Poster) => (
              <div
                key={poster._id}
                className="rounded-lg border overflow-hidden"
              >
                <div className="h-40 bg-muted flex items-center justify-center relative">
                  {poster.generatedImageUrl ? (
                    <img
                      src={poster.generatedImageUrl}
                      alt="Poster"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  )}
                  <div className="absolute top-2 right-2">
                    {statusIcon(poster.status)}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold truncate">
                    {poster.formData?.headline ?? "Untitled"}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {poster.status}
                  </p>
                  {poster.errorMessage && (
                    <p className="text-xs text-red-600">
                      {poster.errorMessage}
                    </p>
                  )}
                  <div className="flex items-center gap-1 pt-2">
                    <a
                      href={poster.generatedImageUrl ?? ""}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      <Eye className="h-3.5 w-3.5" /> View
                    </a>
                    {poster.status === "completed" && (
                      <a
                        href={poster.generatedImageUrl ?? ""}
                        download
                        className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90"
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </a>
                    )}
                    {(poster.status === "completed" ||
                      poster.status === "failed") && (
                      <button
                        onClick={() => regenerate(poster._id)}
                        className="flex items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-50"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />{" "}
                        Regenerate
                      </button>
                    )}
                    <button
                      onClick={() =>
                        toast.promise(deletePoster(poster._id), {
                          loading: "Deleting...",
                          success: "Deleted",
                          error: "Failed",
                        })
                      }
                      disabled={deleting === poster._id}
                      className="flex items-center justify-center rounded-lg px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deleting === poster._id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
