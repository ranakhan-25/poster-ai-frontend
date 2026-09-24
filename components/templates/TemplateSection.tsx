"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { templatesApi, Template } from "@/lib/api/templates";
import TemplateCard from "./TemplateCard";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 6;

export default function TemplateSection() {
  const [search, setSearch] = useState("");
  const [occasionType, setOccasionType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: () => templatesApi.list(),
  });

  const templates = response?.data?.templates ?? [];

  // Create unique category list from API data
  const categories = useMemo(() => {
    const values = templates
      .map((template) => template.occasionType)
      .filter(Boolean);

    return Array.from(new Set(values));
  }, [templates]);

  // Search + Filter
  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesSearch =
        !query ||
        template.title.toLowerCase().includes(query) ||
        template.titleBn?.toLowerCase().includes(query) ||
        template.occasionType.toLowerCase().includes(query);

      const matchesCategory =
        occasionType === "all" ||
        template.occasionType.toLowerCase() === occasionType.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [templates, search, occasionType]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedTemplates = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTemplates, safeCurrentPage]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setOccasionType(value);
    setCurrentPage(1);
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);

    // Save selected template temporarily
    sessionStorage.setItem("selectedTemplate", JSON.stringify(template));
    redirect("/create")
  };

  const clearFilters = () => {
    setSearch("");
    setOccasionType("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = search.trim().length > 0 || occasionType !== "all";

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 py-16 sm:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-150px] top-20 h-96 w-96 rounded-full bg-[#D980FA]/10 blur-3xl" />

        <div className="absolute bottom-20 right-[-150px] h-96 w-96 rounded-full bg-[#009432]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D980FA]/30 bg-[#D980FA]/10 px-4 py-2 text-sm font-medium text-gray-800">
            <SlidersHorizontal className="h-4 w-4 text-[#009432]" />
            Poster Templates
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-[#D980FA] to-[#009432] bg-clip-text text-transparent">
              Poster Template
            </span>
          </h1>

          <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
            Browse professional templates, search by keyword, filter by
            category, and select the perfect design for your poster.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mt-12 rounded border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search templates..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#009432] focus:bg-white focus:ring-4 focus:ring-[#009432]/10"
              />
            </div>

            {/* Category Filter */}
            <div className="relative lg:w-64">
              <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <select
                value={occasionType}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-[#009432] focus:bg-white focus:ring-4 focus:ring-[#009432]/10"
              >
                <option value="all">All Categories</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category
                      .replace(/[-_]/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 text-sm font-semibold text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>

          {/* Result Count */}
          {!isLoading && !isError && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredTemplates.length}
                </span>{" "}
                template
                {filteredTemplates.length !== 1 ? "s" : ""}
              </p>

              {selectedTemplate && (
                <p className="text-sm font-medium text-[#009432]">
                  Selected: {selectedTemplate.title}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[500px] animate-pulse rounded-3xl border border-gray-200 bg-white"
              >
                <div className="h-64 rounded-t-3xl bg-gray-200" />

                <div className="space-y-4 p-6">
                  <div className="h-5 w-24 rounded bg-gray-200" />
                  <div className="h-6 w-2/3 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-12 w-full rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
            <p className="font-semibold text-red-700">
              Failed to load templates.
            </p>

            <p className="mt-2 text-sm text-red-600">Please try again later.</p>
          </div>
        )}

        {/* Template Cards */}
        {!isLoading && !isError && paginatedTemplates.length > 0 && (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedTemplates.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  isSelected={selectedTemplate?._id === template._id}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-between gap-5 sm:flex-row">
                {/* Previous */}
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-[#D980FA] hover:text-[#009432] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                          safeCurrentPage === page
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
                  disabled={safeCurrentPage === totalPages}
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

        {/* No Results */}
        {!isLoading && !isError && paginatedTemplates.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D980FA]/15 to-[#009432]/15">
              <Search className="h-7 w-7 text-[#009432]" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No Templates Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or category filter.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-gradient-to-r from-[#D980FA] to-[#009432] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
