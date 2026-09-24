"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is PosterAI?",
    answer:
      "PosterAI is an AI-powered poster creation platform that helps you create professional posters using ready-made templates, your own photos, and custom information.",
  },
  {
    question: "How do I create a poster?",
    answer:
      "Choose a template, upload your photos, enter your poster information, and click Generate Poster. PosterAI will process your information and create your poster.",
  },
  {
    question: "Can I upload my own photos?",
    answer:
      "Yes. You can upload your own photos when creating a poster. The number of photos you can upload depends on the selected template.",
  },
  {
    question: "Can I customize the poster information?",
    answer:
      "Yes. You can provide your headline, name, designation, party or organization, district, upazila, and footer information before generating the poster.",
  },
  {
    question: "How long does poster generation take?",
    answer:
      "Poster generation normally takes a short amount of time. The exact time can vary depending on the selected template, uploaded images, and AI processing.",
  },
  {
    question: "Can I regenerate a poster?",
    answer:
      "Yes. If you are not satisfied with a generated poster, you can use the Regenerate option from the poster details page to create another version.",
  },
  {
    question: "Where can I find my previous posters?",
    answer:
      "Your generated posters are available in Poster History. You can open, download, regenerate, or delete your previous posters from there.",
  },
  {
    question: "Do I need an account to create posters?",
    answer:
      "Yes. You need to sign in to your PosterAI account to create and manage posters. This allows your generated posters to be securely associated with your account.",
  },
  {
    question: "Are my uploaded photos stored securely?",
    answer:
      "Uploaded photos are processed through the application's configured storage system. Access to your poster data is protected by authentication and authorization.",
  },
  {
    question: "Can I use PosterAI on mobile devices?",
    answer:
      "Yes. PosterAI is designed to be responsive and can be used on desktop, tablet, and mobile devices.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-slate-50 py-10"
    >
      {/* Decorative background */}{" "}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D980FA]/10 blur-3xl" />{" "}
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#009432]/10 blur-3xl" />
 
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
            }}
          >
            <HelpCircle className="h-7 w-7" />
          </div>

          <span className="mt-3 block text-sm font-semibold uppercase tracking-wider text-[#009432]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl ">
            Everything you need to know about
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
              }}
            >
              PosterAI
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Find answers to common questions about creating, generating, and
            managing your posters.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-[#D980FA]/40 shadow-lg"
                      : "border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition ${
                          isOpen ? "text-white" : "bg-slate-100 text-slate-500"
                        }`}
                        style={
                          isOpen
                            ? {
                                background:
                                  "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                              }
                            : undefined
                        }
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-semibold text-slate-900 sm:text-base">
                        {faq.question}
                      </span>
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen
                          ? "rotate-180 bg-[#009432]/10 text-[#009432]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-5 pb-6 pt-4 pl-[4.5rem] sm:px-6 sm:pl-[5.25rem]">
                        <p className="text-sm leading-7 text-slate-600 sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div
            className="overflow-hidden rounded-3xl p-8 text-center sm:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(217,128,250,0.12) 0%, rgba(0,148,50,0.10) 100%)",
            }}
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Still have questions?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Our platform is designed to make poster creation simple, fast, and
              accessible.
            </p>

            <a
              href="mailto:support@posterai.com"
              className="mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
              }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
