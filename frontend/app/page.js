"use client";

import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full border-b border-[var(--border)] sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            PrepAI
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">
              <Link href="/login" className="hover:text-[var(--foreground)] transition-colors">
                Login
              </Link>
              <Link href="/signup" className="hover:text-[var(--foreground)] transition-colors">
                Sign Up
              </Link>
            </div>
            <div className="w-px h-4 bg-[var(--border)] hidden md:block"></div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-3xl space-y-8">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--border)] text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
            AI-Powered Interview Prep
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Master your next interview.
          </h1>

          <p className="text-lg md:text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            Practice with an intelligent AI that adapts to your role, analyzes your responses, and gives you actionable feedback instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Start Mock Interview
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border border-[var(--border)] rounded-full font-medium text-sm hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Real-time Analysis</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Get instant feedback on your answers. Our AI analyzes your content, clarity, and relevance to the job description.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Role Specific</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Tailored questions for Frontend, Backend, Product Management, and more. Practice what actually matters.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Voice & Text</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Speak your answers naturally or type them out. We support both modes to simulate real interview environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center">
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} PrepAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
