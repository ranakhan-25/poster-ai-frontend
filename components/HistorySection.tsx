"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Image as ImageIcon,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { postersApi, Poster } from "@/lib/api/posters";
import PosterHistoryCard from "./PosterHistoryCard";
import Link from "next/link";

export default function HistorySection() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posterToDelete, setPosterToDelete] = useState<Poster | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Get logged-in user's posters.
   *
   * Backend handles:
   * - Search
   * - Pagination
   * - User ownership
   */
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-posters", currentPage, search],
    queryFn: () => postersApi.listMy(currentPage, search, ""),
    placeholderData: (previousData) => previousData,
  });

  const posters = response?.data?.posters ?? [];
  const pagination = response?.data?.pagination;

  const totalPosters = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  /**
   * Search
   */
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  /**
   * Delete poster
   */
  const handleDelete = async () => {
    if (!posterToDelete) {
      return;
    }

    try {
      setIsDeleting(true);

      await postersApi.delete(posterToDelete._id);

      toast.success("Poster deleted successfully.");

      setPosterToDelete(null);

      await queryClient.invalidateQueries({
        queryKey: ["my-posters"],
      });

      /**
       * If current page becomes empty after deletion,
       * go to previous page.
       */
      if (posters.length === 1 && currentPage > 1) {
        setCurrentPage((page) => page - 1);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete poster.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 py-16 sm:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-150px] top-20 h-96 w-96 rounded-full bg-[#D980FA]/10 blur-3xl" />

        <div className="absolute bottom-20 right-[-150px] h-96 w-96 rounded-full bg-[#009432]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D980FA]/30 bg-[#D980FA]/10 px-4 py-2 text-sm font-medium text-gray-800">
              <Clock3 className="h-4 w-4 text-[#009432]" />
              Poster History
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              My Posters
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              View and manage all the posters you have created.
            </p>
          </div>

          {/* Create Poster Button */}
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D980FA] to-[#009432] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Create Poster
          </Link>
        </div>

        {/* Total Posters */}
        {!isLoading && !isError && (
          <div className="mt-8">
            <div className="inline-flex rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
              <div>
                <p className="text-sm text-gray-500">Total Posters</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {totalPosters}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mt-10 rounded border border-gray-200 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search your posters..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#009432] focus:bg-white focus:ring-4 focus:ring-[#009432]/10"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {!isLoading && !isError && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {posters.length}
                </span>{" "}
                posters on this page
              </p>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
              >
                <div className="aspect-[4/5] animate-pulse bg-gray-200" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />

                  <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
              <X className="h-7 w-7 text-red-600" />
            </div>

            <p className="mt-5 font-semibold text-red-700">
              Failed to load your posters.
            </p>

            <p className="mt-2 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Please try again later."}
            </p>

            <button
              type="button"
              onClick={() =>
                queryClient.invalidateQueries({
                  queryKey: ["my-posters"],
                })
              }
              className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posters */}
        {!isLoading && !isError && posters.length > 0 && (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posters.map((poster) => (
                <PosterHistoryCard
                  key={poster._id}
                  poster={poster}
                  onDelete={(poster) => setPosterToDelete(poster)}
                  isDeleting={isDeleting && posterToDelete?._id === poster._id}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-between gap-5 sm:flex-row">
                {/* Previous */}
                <button
                  type="button"
                  disabled={!pagination?.hasPreviousPage}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-[#D980FA] hover:text-[#009432] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-r from-[#D980FA] to-[#009432] text-white shadow-md"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-[#009432] hover:text-[#009432]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Next */}
                <button
                  type="button"
                  disabled={!pagination?.hasNextPage}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-[#D980FA] hover:text-[#009432] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !isError && posters.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D980FA]/15 to-[#009432]/15">
              <ImageIcon className="h-7 w-7 text-[#009432]" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              {search ? "No Posters Found" : "No Posters Yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {search
                ? "Try a different search term."
                : "You have not created any posters yet. Start creating your first poster today."}
            </p>

            {search ? (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 rounded-xl bg-gradient-to-r from-[#D980FA] to-[#009432] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
              >
                Clear Search
              </button>
            ) : (
              <a
                href="/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D980FA] to-[#009432] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
              >
                <Plus className="h-5 w-5" />
                Create Your First Poster
              </a>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {posterToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Delete Poster?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {posterToDelete.formData?.headline || "this poster"}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setPosterToDelete(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}

                {isDeleting ? "Deleting..." : "Delete Poster"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
