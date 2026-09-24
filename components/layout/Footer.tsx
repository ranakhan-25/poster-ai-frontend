"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                P
              </div>

              <span className="text-xl font-bold text-slate-900">PosterAI</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Create beautiful, professional posters with AI-powered layouts,
              templates, and smart design tools.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-600 transition hover:border-[#D980FA] hover:text-[#D980FA]"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-600 transition hover:border-[#D980FA] hover:text-[#D980FA]"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-600 transition hover:border-[#D980FA] hover:text-[#D980FA]"
              >
                in
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Product
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/create"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Create Poster
                </Link>
              </li>

              <li>
                <Link
                  href="/templates"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Templates
                </Link>
              </li>

              <li>
                <Link
                  href="/history"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Poster History
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Company
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/support"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Account
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  href="/history"
                  className="text-sm text-slate-600 transition hover:text-[#009432]"
                >
                  My Posters
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-12 overflow-hidden rounded-2xl p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(217,128,250,0.12) 0%, rgba(0,148,50,0.10) 100%)",
          }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Ready to create your poster?
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Choose a template and create your next poster in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-slate-500">
            © {currentYear} PosterAI. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/privacy"
              className="text-slate-500 transition hover:text-slate-900"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 transition hover:text-slate-900"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
