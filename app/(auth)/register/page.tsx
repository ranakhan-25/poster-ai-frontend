"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth/auth-context";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name must be less than 80 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const { register: authRegister, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Redirect already logged-in users.
   */
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const onSubmit = async (data: RegisterForm) => {
    const { confirmPassword, ...formData } = data;

    setIsLoading(true);

    try {
      /**
       * Backend will:
       * - Create the user
       * - Generate Access Token
       * - Generate Refresh Token
       * - Store both as HttpOnly cookies
       */
      await authRegister(formData);

      toast.success("Account created successfully");

      router.replace("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create account";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Avoid showing the register form
   * while redirecting authenticated users.
   */
  if (user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account{" "}
            <span className="bg-gradient-to-r from-[#D980FA] to-[#009432] bg-clip-text text-transparent">
              Poster AI
            </span>
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Start creating beautiful posters today.
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <input
                id="name"
                {...register("name")}
                type="text"
                autoComplete="name"
                disabled={isLoading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#009432] focus:bg-white focus:ring-4 focus:ring-[#009432]/10 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Your name"
                dir="ltr"
              />

              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                {...register("email")}
                type="email"
                autoComplete="email"
                disabled={isLoading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#009432] focus:bg-white focus:ring-4 focus:ring-[#009432]/10 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="you@example.com"
                dir="ltr"
              />

              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                {...register("password")}
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#009432] focus:bg-white focus:ring-4 focus:ring-[#009432]/10 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="At least 8 characters"
                dir="ltr"
              />

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                {...register("confirmPassword")}
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#009432] focus:bg-white focus:ring-4 focus:ring-[#009432]/10 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Confirm password"
                dir="ltr"
              />

              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D980FA] to-[#009432] py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && <LoadingSpinner size="sm" />}

              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#009432] transition-colors hover:text-[#D980FA] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
