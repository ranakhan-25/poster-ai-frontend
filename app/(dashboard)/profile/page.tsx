"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

export default function ProfilePage() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoggingOut(true);

      await logout();

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#009432]" />

          <p className="text-sm text-gray-500">Loading profile...</p>
        </div>
      </main>
    );
  }

  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            PosterAI
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Profile */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#009432]">
            Account
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account information and profile details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover */}
          <div
            className="h-32 sm:h-40"
            style={{
              background: "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
            }}
          />

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            {/* Avatar */}
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white text-2xl font-bold text-white shadow-lg sm:h-28 sm:w-28 sm:text-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #D980FA 0%, #009432 100%)",
                }}
              >
                {initials}
              </div>

              <Link
                href="/create"
                className="w-fit rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(90deg, #D980FA 0%, #009432 100%)",
                }}
              >
                Create New Poster
              </Link>
            </div>

            {/* Name */}
            <div className="mt-5">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>

              <p className="mt-1 text-gray-500">{user.email}</p>
            </div>

            {/* Information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Full Name
                </p>

                <p className="mt-2 text-base font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Email Address
                </p>

                <p className="mt-2 break-all text-base font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>

              {/* Role */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Account Role
                </p>

                <div className="mt-2">
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold capitalize text-green-700">
                    {user.role || "User"}
                  </span>
                </div>
              </div>

              {/* Member Since */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Member Since
                </p>

                <p className="mt-2 text-base font-semibold text-gray-900">
                  {createdAt}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-bold text-gray-900">
                Account Actions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Manage your PosterAI account.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/history"
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Poster History
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
