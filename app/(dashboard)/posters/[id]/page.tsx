"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  ImageIcon,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { postersApi, Poster } from "@/lib/api/posters";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";

const BRAND_GRADIENT = "linear-gradient(135deg, #D980FA 0%, #009432 100%)";

export default function PosterDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const id = params?.id;

  const [poster, setPoster] = useState<Poster | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const loadPoster = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await postersApi.getById(id);
      const currentPoster = response.data?.poster;

      if (!currentPoster) {
        throw new Error("Poster not found");
      }

      setPoster(currentPoster);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load poster.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPoster();

    return () => {
      stopPolling();
    };
  }, [loadPoster, stopPolling]);

  /*
   * Poll the poster while AI generation is running.
   */
  useEffect(() => {
    if (!poster || !id) {
      stopPolling();
      return;
    }

    if (poster.status !== "generating") {
      stopPolling();
      return;
    }

    stopPolling();

    pollingRef.current = setInterval(async () => {
      try {
        const response = await postersApi.getById(id);
        const currentPoster = response.data?.poster;

        if (!currentPoster) {
          return;
        }

        setPoster(currentPoster);

        if (currentPoster.status === "completed") {
          stopPolling();

          queryClient.invalidateQueries({
            queryKey: ["my-posters"],
          });

          toast.success("Poster generated successfully!");
        }

        if (currentPoster.status === "failed") {
          stopPolling();

          queryClient.invalidateQueries({
            queryKey: ["my-posters"],
          });

          toast.error(
            currentPoster.errorMessage ?? "Poster generation failed.",
          );
        }
      } catch {
        // Keep polling if one request fails.
      }
    }, 2500);

    return () => {
      stopPolling();
    };
  }, [poster, id, queryClient, stopPolling]);

  const regenerate = async () => {
    if (!id || isRegenerating) return;

    try {
      setIsRegenerating(true);
      setError(null);

      const response = await postersApi.regenerate(id);
      const newStatus = response.data?.status ?? "generating";

      setPoster((current) =>
        current
          ? {
              ...current,
              status:
                newStatus === "generating" ? "generating" : current.status,
            }
          : current,
      );

      queryClient.invalidateQueries({
        queryKey: ["my-posters"],
      });

      toast.success("Poster regeneration started.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to regenerate poster.",
      );
    } finally {
      setIsRegenerating(false);
    }
  };

  const deletePoster = async () => {
    if (!id || isDeleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this poster? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await postersApi.delete(id);

      stopPolling();

      queryClient.invalidateQueries({
        queryKey: ["my-posters"],
      });

      toast.success("Poster deleted successfully.");

      router.push("/history");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete poster.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusConfig = (status: Poster["status"]) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          description: "Your poster has been generated successfully.",
          icon: CheckCircle2,
          wrapper: "border-green-200 bg-green-50 text-green-700",
          iconClass: "text-green-600",
        };

      case "generating":
        return {
          label: "Generating",
          description:
            "AI is currently generating your poster. This page will update automatically.",
          icon: Clock,
          wrapper: "border-blue-200 bg-blue-50 text-blue-700",
          iconClass: "text-blue-600",
        };

      case "failed":
        return {
          label: "Generation Failed",
          description:
            poster?.errorMessage ??
            "Something went wrong while generating your poster.",
          icon: AlertCircle,
          wrapper: "border-red-200 bg-red-50 text-red-700",
          iconClass: "text-red-600",
        };

      default:
        return {
          label: "Draft",
          description: "This poster is currently a draft.",
          icon: FileText,
          wrapper: "border-slate-200 bg-slate-50 text-slate-700",
          iconClass: "text-slate-500",
        };
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-[70vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </main>
    );
  }

  if (error || !poster) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/history"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Poster History
          </Link>

          <ErrorState message={error ?? "Poster not found."} />
        </div>
      </main>
    );
  }

  const statusConfig = getStatusConfig(poster.status);
  const StatusIcon = statusConfig.icon;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ background: BRAND_GRADIENT }}
            >
              P
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900">PosterAI</p>
              <p className="text-xs text-slate-500">AI Poster Maker</p>
            </div>
          </Link>

          <Link
            href="/create"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: BRAND_GRADIENT }}
          >
            Create Poster
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/history"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Poster History
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">Poster Details</p>

          <h1 className="mt-1 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            {poster.formData?.headline || "Generated Poster"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Created{" "}
            {new Date(poster.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Poster Preview */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="relative min-h-[400px] overflow-hidden rounded-xl bg-slate-100 sm:min-h-[500px]">
              {poster.generatedImageUrl ? (
                <Image
                  src={poster.generatedImageUrl}
                  alt={poster.formData?.headline || "Generated poster"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, calc(100vw - 430px)"
                  className="object-contain"
                />
              ) : (
                <div className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
                  {poster.status === "generating" ? (
                    <>
                      <div
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full text-white"
                        style={{
                          background: BRAND_GRADIENT,
                        }}
                      >
                        <RefreshCw className="h-7 w-7 animate-spin" />
                      </div>

                      <h2 className="text-lg font-semibold text-slate-900">
                        Generating your poster
                      </h2>

                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Please wait while the AI generation process completes.
                        This page will update automatically.
                      </p>
                    </>
                  ) : poster.status === "failed" ? (
                    <>
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                      </div>

                      <h2 className="text-lg font-semibold text-slate-900">
                        Generation failed
                      </h2>

                      <p className="mt-2 max-w-md text-sm text-slate-500">
                        {poster.errorMessage ??
                          "The poster could not be generated."}
                      </p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-16 w-16 text-slate-300" />

                      <p className="mt-4 text-sm text-slate-500">
                        No generated image available.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Status */}
            <div
              className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${statusConfig.wrapper}`}
            >
              <StatusIcon
                className={`mt-0.5 h-5 w-5 shrink-0 ${statusConfig.iconClass} ${
                  poster.status === "generating" ? "animate-pulse" : ""
                }`}
              />

              <div>
                <p className="font-semibold">{statusConfig.label}</p>

                <p className="mt-1 text-sm opacity-90">
                  {statusConfig.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              {poster.status === "completed" && poster.generatedImageUrl && (
                <a
                  href={poster.generatedImageUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{
                    background: BRAND_GRADIENT,
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </a>
              )}

              {(poster.status === "completed" ||
                poster.status === "failed") && (
                <button
                  type="button"
                  onClick={regenerate}
                  disabled={isRegenerating}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      isRegenerating ? "animate-spin" : ""
                    }`}
                  />

                  {isRegenerating ? "Starting..." : "Regenerate"}
                </button>
              )}

              <button
                type="button"
                onClick={deletePoster}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />

                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </section>

          {/* Details */}
          <aside className="space-y-6">
            {/* Poster Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Poster Information
              </h2>

              <div className="mt-5 divide-y divide-slate-100">
                <DetailRow label="Headline" value={poster.formData?.headline} />

                <DetailRow label="Name" value={poster.formData?.name} />

                <DetailRow
                  label="Designation"
                  value={poster.formData?.designation}
                />

                <DetailRow label="Party" value={poster.formData?.party} />

                <DetailRow
                  label="Organization"
                  value={poster.formData?.organization}
                />

                <DetailRow label="District" value={poster.formData?.district} />

                <DetailRow label="Upazila" value={poster.formData?.upazila} />

                <DetailRow
                  label="Footer Credit"
                  value={poster.formData?.footerCredit}
                />
              </div>
            </section>

            {/* Template */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Template</h2>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="font-medium text-slate-900">
                  {typeof poster.templateId === "object"
                    ? poster.templateId.title
                    : poster.templateId}
                </p>

                {typeof poster.templateId === "object" && (
                  <>
                    <p className="mt-1 text-sm text-slate-500">
                      {poster.templateId.titleBn}
                    </p>

                    <p className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {poster.templateId.occasionType}
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Generation Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Generation Information
              </h2>

              <div className="mt-4 space-y-4">
                <InfoItem label="Status" value={poster.status} />

                <InfoItem
                  label="Generation Attempts"
                  value={String(poster.generationAttempts)}
                />

                <InfoItem
                  label="AI Fallback Used"
                  value={poster.aiUsedFallback ? "Yes" : "No"}
                />

                <InfoItem
                  label="Uploaded Photos"
                  value={String(poster.uploadedPhotoUrls?.length ?? 0)}
                />
              </div>
            </section>

            {/* Uploaded Photos */}
            {poster.uploadedPhotoUrls?.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                  Uploaded Photos
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {poster.uploadedPhotoUrls.map((url, index) => (
                    <a
                      key={`${url}-${index}`}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                    >
                      <Image
                        src={url}
                        alt={`Uploaded photo ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 180px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }

  return (
    <div className="py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>

      <dd className="mt-1 break-words text-sm font-medium text-slate-800">
        {value}
      </dd>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-right text-sm font-semibold capitalize text-slate-800">
        {value}
      </span>
    </div>
  );
}
