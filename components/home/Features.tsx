"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  PartyPopper,
  Megaphone,
  Heart,
  CalendarDays,
  Image as ImageIcon,
  ArrowRight,
  LayoutTemplate,
} from "lucide-react";

import { templatesApi, Template } from "@/lib/api/templates";
import Link from "next/link";

const occasionIconMap: Record<string, React.ElementType> = {
  campaign: Megaphone,
  election: Megaphone,
  greeting: PartyPopper,
  festival: PartyPopper,
  tribute: Heart,
  condolence: Heart,
  event: CalendarDays,
  celebration: PartyPopper,
};

function getOccasionIcon(occasionType: string) {
  const key = occasionType.toLowerCase();

  return occasionIconMap[key] || LayoutTemplate;
}

function formatOccasionType(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getFeatureDescription(template: Template) {
  const occasion = formatOccasionType(template.occasionType);

  return `Create a professional ${occasion.toLowerCase()} poster using this ready-made AI-powered template.`;
}

export default function Features() {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: () => templatesApi.list(),
  });

  const templates = response?.data?.templates ?? [];

  // Only show first 6 templates
  const visibleTemplates = templates.slice(0, 6);

  return (
    <section id="features" className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#D980FA]/10 blur-3xl" />

        <div className="absolute bottom-20 right-[-120px] h-72 w-72 rounded-full bg-[#009432]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D980FA]/30 bg-[#D980FA]/10 px-4 py-2 text-sm font-medium text-gray-800">
            <Sparkles className="h-4 w-4 text-[#009432]" />
            Powerful Features
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything You Need to
            <span className="block bg-gradient-to-r from-[#D980FA] to-[#009432] bg-clip-text text-transparent">
              Create Better Posters
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
            Explore professionally designed templates and create stunning
            posters faster with AI-powered tools.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-gray-50"
              >
                <div className="h-48 bg-gray-200" />

                <div className="space-y-3 p-6">
                  <div className="h-5 w-2/3 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-4/5 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-16 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
            Failed to load templates. Please try again later.
          </div>
        )}

        {/* Templates */}
        {!isLoading && !isError && visibleTemplates.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTemplates.map((template) => {
              const Icon = getOccasionIcon(template.occasionType);

              return (
                <div
                  key={template._id}
                  className="group relative overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Top gradient line */}
                  <div className="absolute inset-x-6 top-0 z-10 h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-[#D980FA] to-[#009432] transition-transform duration-300 group-hover:scale-x-100" />

                  {/* Template Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {template.thumbnailUrl ? (
                      <img
                        src={template.thumbnailUrl}
                        alt={template.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#D980FA]/10 to-[#009432]/10">
                        <ImageIcon className="h-14 w-14 text-gray-300" />
                      </div>
                    )}

                    {/* Occasion Badge */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
                      <Icon className="h-3.5 w-3.5 text-[#009432]" />

                      {formatOccasionType(template.occasionType)}
                    </div>

                    {/* Active Badge */}
                    {template.isActive && (
                      <div className="absolute right-4 top-4 rounded-full bg-[#009432] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                        Active
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {template.title}
                        </h3>

                        {template.titleBn && (
                          <p className="mt-1 text-sm text-gray-500">
                            {template.titleBn}
                          </p>
                        )}
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D980FA]/15 to-[#009432]/15">
                        <Icon className="h-5 w-5 text-[#009432]" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-gray-600">
                      {getFeatureDescription(template)}
                    </p>

                    {/* Template Info */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {template.layoutConfig?.layout && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {formatOccasionType(template.layoutConfig.layout)}
                        </span>
                      )}

                      {template.photoSlots?.max !== undefined && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          Up to {template.photoSlots.max} Photos
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="">
                        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 transition-colors group-hover:text-[#009432]" href={"/create"}>
                          Explore Template
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#D980FA] to-[#009432]">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && visibleTemplates.length === 0 && (
          <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
            <LayoutTemplate className="mx-auto h-10 w-10 text-gray-300" />

            <p className="mt-4 text-gray-500">
              No templates available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
