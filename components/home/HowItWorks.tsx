"use client";

import Link from "next/link";
import {
  ImagePlus,
  Sparkles,
  Download,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ImagePlus,
    title: "Choose a Template",
    description:
      "Pick a professionally designed poster template that matches your campaign, event, or occasion.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Add Your Details",
    description:
      "Upload your photos and add your headline, name, designation, organization, and other information.",
  },
  {
    number: "03",
    icon: Download,
    title: "Generate & Download",
    description:
      "Let PosterAI create your design and download your finished poster in just a few moments.",
  },
];

const benefits = [
  "AI-powered poster layouts",
  "Multiple professional templates",
  "Easy photo upload",
  "Fast poster generation",
  "Responsive design",
  "Poster history management",
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D980FA]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#009432]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background:
                "linear-gradient(135deg, rgba(217,128,250,0.12), rgba(0,148,50,0.12))",
              color: "#009432",
            }}
          >
            Simple & Powerful
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Create professional posters
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
              }}
            >
              in just three steps
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            PosterAI makes poster creation simple. Choose a design, add your
            information, and let AI handle the layout.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <div
                  className={`group h-full rounded border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    index === 0
                      ? "border-purple-100 bg-gradient-to-br from-[#D980FA]/10 via-white to-[#D980FA]/5"
                      : index === 1
                        ? "border-green-100 bg-gradient-to-br from-[#009432]/10 via-white to-[#009432]/5"
                        : "border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
                  }`}
                >
                  {/* Number + icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-300">
                      {step.number}
                    </span>

                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md transition group-hover:scale-110"
                      style={{
                        background:
                          "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute right-[-24px] top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-6 w-6 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="p-8 sm:p-10 lg:p-12">
              <span className="text-sm font-semibold text-[#009432]">
                Why PosterAI?
              </span>

              <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Everything you need to create better posters
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                From template selection to final download, PosterAI gives you a
                simple workflow designed for fast and professional results.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#009432]" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/create"
                className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                Start Creating
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right visual */}
            <div
              className="relative min-h-[320px] overflow-hidden p-8 lg:min-h-full"
              style={{
                background: "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
              }}
            >
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex h-full items-center justify-center">
                <div className="w-full max-w-sm rounded-3xl border border-white/30 bg-white/15 p-5 shadow-2xl backdrop-blur-md">
                  <div className="rounded-2xl bg-white p-5 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-3 w-24 rounded-full bg-slate-200" />
                        <div className="mt-2 h-2 w-16 rounded-full bg-slate-100" />
                      </div>

                      <div
                        className="h-10 w-10 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                        }}
                      />
                    </div>

                    <div className="mt-5 h-28 rounded-2xl bg-slate-100">
                      <div className="flex h-full items-center justify-center">
                        <Sparkles className="h-10 w-10 text-[#009432]" />
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                      <div className="h-2 w-1/2 rounded-full bg-slate-100" />
                      <div className="h-2 w-2/3 rounded-full bg-slate-100" />
                    </div>

                    <div className="mt-5 flex gap-2">
                      <div className="h-8 flex-1 rounded-lg bg-slate-100" />

                      <div
                        className="h-8 w-20 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            Your next poster is just a few clicks away.
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Start with a template and turn your idea into a polished poster with
            PosterAI.
          </p>

          <Link
            href="/create"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
            }}
          >
            Create Your Poster
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
