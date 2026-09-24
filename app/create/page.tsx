"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { templatesApi, Template } from "@/lib/api/templates";
import { postersApi } from "@/lib/api/posters";
import { useAuth } from "@/lib/auth/auth-context";

const BRAND_GRADIENT = "linear-gradient(135deg, #D980FA 0%, #009432 100%)";

export default function CreatePosterPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  const [headline, setHeadline] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [party, setParty] = useState("");
  const [organization, setOrganization] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [footerCredit, setFooterCredit] = useState("");

  const [photos, setPhotos] = useState<File[]>([]);

  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedTemplate = useMemo(
    () =>
      templates.find((template) => template._id === selectedTemplateId) ?? null,
    [templates, selectedTemplateId],
  );

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const loadTemplates = async () => {
      try {
        setLoadingTemplates(true);
        setError("");

        const response = await templatesApi.list();

        const items = response.data?.templates ?? [];

        setTemplates(items);

        if (items.length > 0) {
          setSelectedTemplateId(items[0]._id);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load poster templates.",
        );
      } finally {
        setLoadingTemplates(false);
      }
    };

    loadTemplates();
  }, [user, router]);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      setError("Only image files are allowed.");
    } else {
      setError("");
    }

    setPhotos((current) => [...current, ...imageFiles]);
  };

  const removePhoto = (index: number) => {
    setPhotos((current) => current.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTemplateId) {
      setError("Please select a poster template.");
      return;
    }

    if (!headline.trim()) {
      setError("Please enter a headline.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }

    if (photos.length === 0) {
      setError("Please upload at least one photo.");
      return;
    }

    const minPhotos = selectedTemplate?.photoSlots?.min ?? 1;
    const maxPhotos = selectedTemplate?.photoSlots?.max ?? 5;

    if (photos.length < minPhotos) {
      setError(
        `This template requires at least ${minPhotos} photo${
          minPhotos > 1 ? "s" : ""
        }.`,
      );
      return;
    }

    if (photos.length > maxPhotos) {
      setError(
        `This template allows a maximum of ${maxPhotos} photo${
          maxPhotos > 1 ? "s" : ""
        }.`,
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const formData = new FormData();

      formData.append("templateId", selectedTemplateId);
      formData.append("headline", headline.trim());
      formData.append("name", name.trim());

      if (designation.trim()) {
        formData.append("designation", designation.trim());
      }

      if (party.trim()) {
        formData.append("party", party.trim());
      }

      if (organization.trim()) {
        formData.append("organization", organization.trim());
      }

      if (district.trim()) {
        formData.append("district", district.trim());
      }

      if (upazila.trim()) {
        formData.append("upazila", upazila.trim());
      }

      if (footerCredit.trim()) {
        formData.append("footerCredit", footerCredit.trim());
      }

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const response = await postersApi.create(formData);

      const posterId = response.data?.id;

      if (!posterId) {
        throw new Error("Poster was created but no poster ID was returned.");
      }

      router.push(`/history/${posterId}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create poster. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <Link
            href="/history"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to Poster History
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create New Poster
          </h1>

          <p className="mt-2 text-slate-500">
            Choose a template, add your information and generate your poster.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loadingTemplates ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="h-[700px] animate-pulse rounded-2xl bg-white shadow-sm" />
            <div className="h-[500px] animate-pulse rounded-2xl bg-white shadow-sm" />
          </div>
        ) : templates.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              🎨
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No templates available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no active poster templates available.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[1fr_380px]"
          >
            {/* Main form */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              {/* Template selection */}
              <div className="mb-8">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    1. Choose Template
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select a design for your poster.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {templates.map((template) => {
                    const isSelected = template._id === selectedTemplateId;

                    return (
                      <button
                        key={template._id}
                        type="button"
                        onClick={() => setSelectedTemplateId(template._id)}
                        className={`overflow-hidden rounded-xl border-2 text-left transition ${
                          isSelected
                            ? "border-green-500 shadow-md"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="relative aspect-[4/3] bg-slate-100">
                          {template.thumbnailUrl ? (
                            <Image
                              src={template.thumbnailUrl}
                              alt={template.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                              No preview
                            </div>
                          )}

                          {isSelected && (
                            <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                              ✓
                            </div>
                          )}
                        </div>

                        <div className="p-3">
                          <p className="font-semibold text-slate-900">
                            {template.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {template.occasionType}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Poster information */}
              <div className="mb-8">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    2. Poster Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter the information that should appear on your poster.
                  </p>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label
                      htmlFor="headline"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Headline <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="headline"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Enter poster headline"
                      maxLength={200}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        maxLength={120}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="designation"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Designation
                      </label>

                      <input
                        id="designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Chairman"
                        maxLength={120}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="party"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Party
                      </label>

                      <input
                        id="party"
                        value={party}
                        onChange={(e) => setParty(e.target.value)}
                        placeholder="Enter party name"
                        maxLength={120}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="organization"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Organization
                      </label>

                      <input
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Enter organization"
                        maxLength={150}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="district"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        District
                      </label>

                      <input
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="Enter district"
                        maxLength={100}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="upazila"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Upazila
                      </label>

                      <input
                        id="upazila"
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        placeholder="Enter upazila"
                        maxLength={100}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="footerCredit"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Footer Credit
                    </label>

                    <input
                      id="footerCredit"
                      value={footerCredit}
                      onChange={(e) => setFooterCredit(e.target.value)}
                      placeholder="Optional footer text"
                      maxLength={150}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">
                    3. Upload Photos
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedTemplate?.photoSlots?.min ?? 1}–
                    {selectedTemplate?.photoSlots?.max ?? 5} photos supported by
                    this template.
                  </p>
                </div>

                <label
                  htmlFor="photos"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-green-400 hover:bg-green-50/30"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                    📷
                  </div>

                  <p className="text-sm font-semibold text-slate-700">
                    Click to upload photos
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PNG, JPG, JPEG or WEBP
                  </p>

                  <input
                    id="photos"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>

                {photos.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {photos.map((photo, index) => (
                      <div
                        key={`${photo.name}-${index}`}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={URL.createObjectURL(photo)}
                            alt={`Uploaded photo ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white transition hover:bg-red-600"
                          aria-label={`Remove photo ${index + 1}`}
                        >
                          ×
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                          <p className="truncate text-[11px] text-white">
                            {photo.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                <Link
                  href="/history"
                  className="rounded-xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: BRAND_GRADIENT }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Generating Poster...
                    </span>
                  ) : (
                    "Generate Poster"
                  )}
                </button>
              </div>
            </section>

            {/* Preview / Summary */}
            <aside className="h-fit space-y-6 lg:sticky lg:top-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div
                  className="px-5 py-4 text-white"
                  style={{ background: BRAND_GRADIENT }}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Selected Template
                  </p>

                  <h2 className="mt-1 text-lg font-bold">
                    {selectedTemplate?.title ?? "No template selected"}
                  </h2>
                </div>

                {selectedTemplate?.thumbnailUrl ? (
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={selectedTemplate.thumbnailUrl}
                      alt={selectedTemplate.title}
                      fill
                      className="object-cover"
                      sizes="380px"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 text-sm text-slate-400">
                    Template preview
                  </div>
                )}

                <div className="p-5">
                  <div className="space-y-4">
                    <SummaryRow
                      label="Headline"
                      value={headline || "Not provided"}
                    />

                    <SummaryRow label="Name" value={name || "Not provided"} />

                    <SummaryRow
                      label="Designation"
                      value={designation || "Not provided"}
                    />

                    <SummaryRow
                      label="District"
                      value={district || "Not provided"}
                    />

                    <SummaryRow
                      label="Photos"
                      value={`${photos.length} uploaded`}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <h3 className="font-semibold text-green-900">
                  AI Poster Generation
                </h3>

                <p className="mt-2 text-sm leading-6 text-green-800">
                  Your information and uploaded photos will be processed to
                  create a poster based on the selected template.
                </p>
              </div>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}
