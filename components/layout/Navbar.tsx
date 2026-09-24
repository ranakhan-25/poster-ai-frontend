"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User as UserIcon,
  X,
  Image as ImageIcon,
  Plus,
  Home,
  Layers3,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Templates", href: "/templates" },
  { label: "About", href: "/about" },
  { label: "Contract", href: "/contract" },
];

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);

    await logout();
  };

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D980FA] to-[#009432] shadow-md transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div>
            <div className="bg-gradient-to-r from-[#D980FA] to-[#009432] bg-clip-text text-xl font-extrabold text-transparent">
              PosterAI
            </div>

            <div className="hidden text-[10px] font-medium tracking-wide text-gray-500 sm:block">
              AI Powered Poster Maker
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-[#009432]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          {isLoading ? (
            <div className="h-10 w-32 animate-pulse rounded-full bg-gray-100" />
          ) : user ? (
            /* Logged-in User */
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1.5 shadow-sm transition-all hover:border-[#D980FA] hover:shadow-md"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D980FA] to-[#009432] text-xs font-bold text-white">
                  {getInitials(user.name)}
                </div>

                <div className="hidden max-w-[120px] text-left xl:block">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>

                  <p className="truncate text-[11px] text-gray-500">
                    {user.email}
                  </p>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                  {/* User Info */}
                  <div className="mb-2 rounded-xl bg-gradient-to-r from-[#D980FA]/10 to-[#009432]/10 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D980FA] to-[#009432] text-sm font-bold text-white">
                        {getInitials(user.name)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#009432]"
                    >
                      <UserIcon className="h-4 w-4" />
                      Profile
                    </Link>

                    <Link
                      href="/history"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#009432]"
                    >
                      <ImageIcon className="h-4 w-4" />
                      My Posters
                    </Link>

                    <Link
                      href="/create"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#009432]"
                    >
                      <Plus className="h-4 w-4" />
                      Create Poster
                    </Link>
                  </div>

                  <div className="my-2 border-t border-gray-100" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out User */
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:text-[#009432]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-[#D980FA] to-[#009432] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {/* Main Nav */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#009432]"
              >
                {item.label === "Home" && <Home className="h-4 w-4" />}
                {item.label === "Templates" && <Layers3 className="h-4 w-4" />}
                {item.label === "Features" && <Sparkles className="h-4 w-4" />}
                {item.label === "Pricing" && <Sparkles className="h-4 w-4" />}

                {item.label}
              </Link>
            ))}

            <div className="my-3 border-t border-gray-100" />

            {isLoading ? (
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
            ) : user ? (
              <>
                {/* Mobile User Info */}
                <div className="mb-2 rounded-xl bg-gradient-to-r from-[#D980FA]/10 to-[#009432]/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D980FA] to-[#009432] text-sm font-bold text-white">
                      {getInitials(user.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <UserIcon className="h-4 w-4" />
                  Profile
                </Link>

                <Link
                  href="/history"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <ImageIcon className="h-4 w-4" />
                  My Posters
                </Link>

                <Link
                  href="/create"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  Create Poster
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              /* Mobile Logged-out */
              <div className="flex gap-3 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#D980FA] to-[#009432] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
