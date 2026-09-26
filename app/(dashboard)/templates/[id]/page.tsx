"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { templatesApi, Template } from "@/lib/api/templates";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";
import { ArrowLeft, Download, ImageIcon } from "lucide-react";

export default function TemplateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["template", id],
    queryFn: () => templatesApi.getById(id),
    enabled: !!id,
  });

  const template: Template | undefined = data?.data.template;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push("/templates")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </button>
        <ErrorState message="Template not found" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/templates")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Templates
      </button>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border overflow-hidden bg-muted aspect-[3/4] flex items-center justify-center">
            {generatedUrl ? (
              <img
                src={generatedUrl}
                alt="Poster preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
            )}
          </div>
          {generatedUrl && (
            <a
              href={generatedUrl}
              download
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Download Poster
            </a>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{template.titleBn}</h1>
            <p className="text-muted-foreground">{template.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Occasion</p>
              <p className="font-medium capitalize">
                {template.occasionType.replace("_", " ")}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Layout</p>
              <p className="font-medium capitalize">
                {template.layoutConfig.layout.replace("_", " ")}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Photos</p>
              <p className="font-medium">
                {template.photoSlots?.min ?? 0} - {template.photoSlots?.max ?? 3}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Colors</p>
              <div className="flex gap-2 mt-1">
                {template.colors?.background && (
                  <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: template.colors.background }}
                  />
                )}
                {template.colors?.text && (
                  <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: template.colors.text }}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground text-sm">
              This template is designed for {template.titleBn} occasions.
              Use it to create beautiful posters with AI-powered layouts.
            </p>
          </div>

           <button
             onClick={() => {
               router.push(`/create?template=${template._id}`)
             }}
             className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
           >
            Use this Template
          </button>
        </div>
      </div>
    </div>
  );
}
