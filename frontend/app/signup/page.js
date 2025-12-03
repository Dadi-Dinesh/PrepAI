"use client";

import SignupForm from "../components/SignupForm";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            PrepAI
          </Link>
          <ThemeToggle />
        </div>

        {/* Form */}
        <SignupForm />
      </div>
    </div>
  );
}
