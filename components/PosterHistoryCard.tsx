"use client";

import {
  CalendarDays,
  Download,
  Image as ImageIcon,
  Loader2,
  Trash2,
} from "lucide-react";

import type { Poster } from "@/lib/api/posters";

interface PosterHistoryCardProps {
  poster: Poster;
  onDelete: (poster: Poster) => void;
  isDeleting?: boolean;
}

export default function PosterHistoryCard({
  poster,
  onDelete,
  isDeleting = false,
}: PosterHistoryCardProps) {
  const imageUrl = poster.generatedImageUrl;

  const formattedDate = new Date(poster.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const posterTitle =
    typeof poster.templateId === "object"
      ? poster.templateId.title
      : poster.formData?.headline || "Untitled Poster";

  return (
    <article className="group overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Poster Preview */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={posterTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#D980FA]/10 to-[#009432]/10">
            <ImageIcon className="h-14 w-14 text-gray-300" />
          </div>
        )}

        {/* Status */}
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold capitalize text-gray-700 shadow-sm backdrop-blur">
          {poster.status}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {imageUrl && (
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="m-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-lg transition-colors hover:bg-gray-100"
            >
              <Download className="h-4 w-4" />
              View Poster
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="truncate text-lg font-bold text-gray-900">
          {posterTitle}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays className="h-4 w-4" />
          {formattedDate}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          {imageUrl && (
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              <Download className="h-4 w-4" />
              View
            </a>
          )}

          <button
            type="button"
            onClick={() => onDelete(poster)}
            disabled={isDeleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}

            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
