"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  WandSparkles,
  Image as ImageIcon,
  Download,
  CheckCircle2,
  Layers3,
} from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D980FA]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#009432]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6  lg:px-8 ">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* =========================================================
              LEFT CONTENT
          ========================================================= */}
          <div className="relative z-10 max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D980FA]/30 bg-gradient-to-r from-[#D980FA]/10 to-[#009432]/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#009432]" />

              <span className="text-sm font-semibold text-slate-700">
                AI-Powered Poster Maker
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#009432]" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Create Stunning
              <span className="block bg-gradient-to-r from-[#D980FA] to-[#009432] bg-clip-text text-transparent">
                Posters with AI
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Create professional political, event, campaign, greeting, and
              celebration posters in minutes. Add your content, upload your
              photos, and let AI do the design work.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                <WandSparkles className="h-5 w-5" />
                Create Your Poster
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D980FA]/40 hover:shadow-md"
              >
                <Layers3 className="h-5 w-5" />
                Explore Templates
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["AI Powered", "Up to 3 Photos", "High Resolution"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009432]" />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* =========================================================
              RIGHT PRODUCT VISUAL
          ========================================================= */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            {/* Main Glow */}
            <div
              className="absolute inset-10 rounded-[3rem] opacity-30 blur-3xl"
              style={{
                background: "linear-gradient(135deg, #D980FA, #009432)",
              }}
            />

            {/* Browser / App Window */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
              {/* Browser Header */}
              <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-slate-50 px-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
                </div>

                <div className="rounded-md bg-white px-4 py-1 text-[10px] text-slate-400 shadow-sm">
                  posterai.app/create
                </div>

                <div className="w-12" />
              </div>

              {/* App Content */}
              <div className="grid min-h-[500px] grid-cols-[80px_1fr] bg-slate-100">
                {/* Sidebar */}
                <div className="border-r border-slate-200 bg-white p-3">
                  <div
                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md"
                    style={{
                      background: "linear-gradient(135deg, #D980FA, #009432)",
                    }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="mx-auto h-8 w-8 rounded-lg bg-[#D980FA]/10" />
                    <div className="mx-auto h-8 w-8 rounded-lg bg-slate-100" />
                    <div className="mx-auto h-8 w-8 rounded-lg bg-slate-100" />
                    <div className="mx-auto h-8 w-8 rounded-lg bg-slate-100" />
                  </div>
                </div>

                {/* Real Image */}
                <div className="relative h-[460px] overflow-hidden bg-white p-5">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85"
                      alt="PosterAI community poster preview"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Poster Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                        PosterAI
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">
                        Create Something
                        <br />
                        Beautiful
                      </h3>

                      <p className="mt-2 text-xs text-white/80">
                        AI-powered poster generation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI Card */}
            <div className="absolute -left-5 top-20 hidden items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-xl sm:flex">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                style={{
                  background: "linear-gradient(135deg, #D980FA, #009432)",
                }}
              >
                <WandSparkles className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-800">
                  AI Generation
                </p>

                <p className="text-[9px] text-slate-400">Ready to create</p>
              </div>
            </div>

            {/* Floating Template Card */}
            <div className="absolute -right-4 bottom-14 hidden items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-xl sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D980FA]/10">
                <Layers3 className="h-4 w-4 text-[#D980FA]" />
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-800">
                  100+ Templates
                </p>

                <p className="text-[9px] text-slate-400">Ready to customize</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
