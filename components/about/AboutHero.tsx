
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ImagePlus,
  WandSparkles,
  CheckCircle2,
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white py-10 ">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#D980FA]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#009432]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, rgba(217,128,250,0.12), rgba(0,148,50,0.12))",
                color: "#009432",
              }}
            >
              <Sparkles className="h-4 w-4" />
              About PosterAI
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Powerful poster creation,
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                made simple.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              PosterAI is a modern AI-powered poster creation platform built
              to help people create beautiful, professional posters without
              needing advanced design skills.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              From campaigns and community events to celebrations and
              announcements, PosterAI makes the entire poster creation
              process faster, easier, and more accessible.
            </p>

            {/* Features */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Easy to use",
                "AI-powered layouts",
                "Professional templates",
                "Fast generation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#009432]" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                Create a Poster
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#D980FA]/40 hover:shadow-md"
              >
                Explore Templates
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* Glow */}
            <div
              className="absolute inset-8 rounded-[3rem] opacity-30 blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
              }}
            />

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                    }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      PosterAI
                    </p>
                    <p className="text-xs text-slate-400">
                      AI Poster Studio
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-600">
                  Ready
                </span>
              </div>

              {/* Poster Preview */}
              <div className="mt-5 overflow-hidden rounded-2xl bg-slate-100">
                <div
                  className="relative min-h-[330px] p-6"
                  style={{
                    background:
                      "linear-gradient(145deg, #D980FA 0%, #009432 100%)",
                  }}
                >
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
                  <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative flex h-full min-h-[285px] flex-col justify-between rounded-2xl border border-white/30 bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg bg-white/20 px-3 py-1.5 text-[10px] font-semibold text-white">
                        AI GENERATED
                      </div>

                      <WandSparkles className="h-5 w-5 text-white" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-white/80">
                        CREATE WITHOUT LIMITS
                      </p>

                      <h3 className="mt-2 text-3xl font-black text-white">
                        Your Idea.
                        <br />
                        Your Poster.
                      </h3>

                      <p className="mt-3 max-w-xs text-xs leading-5 text-white/80">
                        Turn your information and photos into a polished
                        visual design.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Tools */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D980FA]/10">
                    <ImagePlus className="h-4 w-4 text-[#D980FA]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">
                      Upload
                    </p>
                    <p className="text-[9px] text-slate-400">
                      Your photos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#009432]/10">
                    <WandSparkles className="h-4 w-4 text-[#009432]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">
                      Generate
                    </p>
                    <p className="text-[9px] text-slate-400">
                      With AI
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -left-5 top-16 hidden rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-slate-700">
                  AI Ready
                </span>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-5 bottom-16 hidden rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-xs font-bold text-slate-800">
                Professional Design
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                Without design skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

