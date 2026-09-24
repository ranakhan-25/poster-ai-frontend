"use client";

import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <div className="">
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ/>
    </div>
  );
}
