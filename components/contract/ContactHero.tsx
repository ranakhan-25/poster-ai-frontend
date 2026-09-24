"use client";

import { Mail, MessageCircle, Clock3, MapPin, Sparkles } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@posterai.com",
    description: "Send us your questions anytime",
  },
  {
    icon: MessageCircle,
    title: "Get Support",
    value: "We're here to help",
    description: "Our team is ready to assist you",
  },
  {
    icon: Clock3,
    title: "Response Time",
    value: "Within 24 hours",
    description: "Usually much faster",
  },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-white py-10 ">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#D980FA]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#009432]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
            Contact PosterAI
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Let's talk about your
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
              }}
            >
              poster ideas.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Have a question, need help with your poster, or want to share
            feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  index === 0
                    ? "border-purple-100 bg-gradient-to-br from-[#D980FA]/10 via-white to-white"
                    : index === 1
                      ? "border-green-100 bg-gradient-to-br from-[#009432]/10 via-white to-white"
                      : "border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white"
                }`}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#009432]">
                  {item.value}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Location / Support Banner */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#009432]/10">
              <MapPin className="h-5 w-5 text-[#009432]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Online Support
              </p>
              <p className="text-xs text-slate-500">
                We're available to help wherever you are.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            Support available online
          </span>
        </div>
      </div>
    </section>
  );
}
