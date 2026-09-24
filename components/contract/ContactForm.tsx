"use client";

import { useState } from "react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-[#D980FA]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#009432]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Information */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl sm:p-10"
            style={{
              background: "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
            }}
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <Sparkles className="h-8 w-8" />

              <h2 className="mt-6 text-3xl font-bold">
                We'd love to hear from you.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/80">
                Whether you have a question, suggestion, or need assistance
                creating a poster, send us a message and our team will get back
                to you.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="mt-1 text-xs text-white/70">
                      support@posterai.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <MessageSquare className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Support</p>
                    <p className="mt-1 text-xs text-white/70">
                      Help with your PosterAI experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-2xl font-bold">24h</p>
                  <p className="mt-1 text-[11px] text-white/70">
                    Typical response
                  </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="mt-1 text-[11px] text-white/70">
                    Message anytime
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle2 className="h-8 w-8 text-[#009432]" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  Message Sent!
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Thanks for reaching out. Your message has been received and
                  we'll get back to you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-sm font-semibold text-[#009432]">
                    Send us a message
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                    How can we help?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Fill out the form below and we'll get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Your Name
                    </label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#D980FA] focus:bg-white focus:ring-2 focus:ring-[#D980FA]/10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#009432] focus:bg-white focus:ring-2 focus:ring-[#009432]/10"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What can we help you with?"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#D980FA] focus:bg-white focus:ring-2 focus:ring-[#D980FA]/10"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Message
                    </label>

                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-slate-400" />

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#009432] focus:bg-white focus:ring-2 focus:ring-[#009432]/10"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                    style={{
                      background:
                        "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                    }}
                  >
                    Send Message
                    <Send className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    We'll only use your information to respond to your message.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
