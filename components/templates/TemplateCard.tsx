"use client";

import {
  Check,
  Image as ImageIcon,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";

import { Template } from "@/lib/api/templates";

interface TemplateCardProps {
  template: Template;
  isSelected?: boolean;
  onSelect: (template: Template) => void;
}

function formatText(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function TemplateCard({
  template,
  isSelected = false,
  onSelect,
}: TemplateCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isSelected
          ? "border-[#009432] ring-2 ring-[#009432]/20"
          : "border-gray-200"
      }`}
    >
      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-[#009432] px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          <Check className="h-3.5 w-3.5" />
          Selected
        </div>
      )}

      {/* Template Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
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

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Active Badge */}
        {template.isActive && (
          <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#009432] shadow-sm backdrop-blur">
            Active
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D980FA]/10 to-[#009432]/10 px-3 py-1.5 text-xs font-semibold text-gray-700">
          <LayoutTemplate className="h-3.5 w-3.5 text-[#009432]" />

          {formatText(template.occasionType)}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900">{template.title}</h3>

        {template.titleBn && (
          <p className="mt-1 text-sm text-gray-500">{template.titleBn}</p>
        )}

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
          Create a professional{" "}
          {formatText(template.occasionType).toLowerCase()} poster using this
          ready-made template.
        </p>

        {/* Template Info */}
        <div className="mt-5 flex flex-wrap gap-2">
          {template.layoutConfig?.layout && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {formatText(template.layoutConfig.layout)}
            </span>
          )}

          {template.photoSlots?.max !== undefined && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              Up to {template.photoSlots.max} Photos
            </span>
          )}
        </div>

        {/* Select Button */}
        <button
          type="button"
          onClick={() => onSelect(template)}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
            isSelected
              ? "bg-[#009432] text-white shadow-md"
              : "bg-gradient-to-r from-[#D980FA] to-[#009432] text-white shadow-sm hover:shadow-lg"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4" />
              Template Selected
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Select Template
            </>
          )}
        </button>
      </div>
    </article>
  );
}
