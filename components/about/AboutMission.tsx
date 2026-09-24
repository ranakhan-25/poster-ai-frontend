
"use client";

import {
  Target,
  Eye,
  Users,
  Zap,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Accessibility",
    description:
      "We believe professional visual design should be accessible to everyone, regardless of their design experience.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description:
      "We remove unnecessary complexity so anyone can create a polished poster in just a few simple steps.",
  },
  {
    icon: Palette,
    title: "Creativity",
    description:
      "Our tools help turn your ideas, information, and images into engaging visual experiences.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "We focus on a dependable workflow that keeps your poster creation process fast and consistent.",
  },
];

export default function AboutMission() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-10">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[#D980FA]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#009432]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background:
                "linear-gradient(135deg, rgba(217,128,250,0.12), rgba(0,148,50,0.12))",
              color: "#009432",
            }}
          >
            <Sparkles className="h-4 w-4" />
            What Drives Us
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Built around your
            <span
              className="ml-2 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
              }}
            >
              creativity
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            PosterAI combines simple tools, thoughtful templates, and AI
            assistance to make visual communication easier.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Mission */}
          <div className="group rounded-3xl border border-purple-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10">
            <div className="flex items-start justify-between">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                <Target className="h-7 w-7" />
              </div>

              <span className="text-sm font-bold text-slate-200">
                01
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-bold text-slate-900">
              Our Mission
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Our mission is to make professional poster creation simple,
              fast, and accessible. PosterAI helps users focus on their
              message while technology handles the visual structure and
              presentation.
            </p>

            <div className="mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-[#D980FA] to-[#009432]" />
          </div>

          {/* Vision */}
          <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10">
            <div className="flex items-start justify-between">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                <Eye className="h-7 w-7" />
              </div>

              <span className="text-sm font-bold text-slate-200">
                02
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-bold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              We envision a world where anyone can transform an idea into
              compelling visual content without needing expensive software
              or advanced design knowledge.
            </p>

            <div className="mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-[#D980FA] to-[#009432]" />
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What we value
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              These principles guide how we build PosterAI and the experience
              we want every user to have.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className={`rounded-2xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    index === 0
                      ? "border-purple-100 bg-gradient-to-br from-[#D980FA]/10 via-white to-white"
                      : index === 1
                        ? "border-green-100 bg-gradient-to-br from-[#009432]/10 via-white to-white"
                        : index === 2
                          ? "border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white"
                          : "border-slate-200 bg-white"
                  }`}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-slate-900">
                    {value.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-16">
          <div
            className="relative overflow-hidden rounded-3xl p-8 text-center shadow-xl sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
            }}
          >
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <Sparkles className="mx-auto h-8 w-8 text-white" />

              <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                Your idea deserves a great design.
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                Start with your message, choose a template, add your photos,
                and let PosterAI help bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

