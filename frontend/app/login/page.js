"use client";

import LoginForm from "../components/LoginForm";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            IntelliPrep AI
          </Link>
          <ThemeToggle />
        </div>

        {/* Form */}
        <LoginForm />
      </div>
    </div>
  );
}
