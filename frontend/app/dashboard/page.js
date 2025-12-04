"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

const interviewHistory = [
  {
    id: 1,
    role: "Frontend Engineer",
    date: "Jan 05, 2025",
    summary:
      "Focused on React hooks, accessibility, and performance optimizations. Feedback emphasized clearer articulation of trade-offs.",
  },
  {
    id: 2,
    role: "Product Manager",
    date: "Dec 28, 2024",
    summary:
      "Scenario-based questions around prioritization and stakeholder management. Recommended practicing concise storytelling.",
  },
  {
    id: 3,
    role: "Data Scientist",
    date: "Dec 15, 2024",
    summary:
      "Covered model evaluation, feature engineering, and A/B testing strategy. Suggested deeper focus on experiment pitfalls.",
  },
];

export default function DashboardPage() {
  const [selectedInterview, setSelectedInterview] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            PrepAI
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/dashboard" className="text-black dark:text-white font-medium">
              Dashboard
            </Link>
            <Link href="/interview" className="hover:text-black dark:hover:text-white">
              Interview
            </Link>
            <Link href="/profile" className="hover:text-black dark:hover:text-white">
              Profile
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Body */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
          {/* Hero / CTA */}
          <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-500">
                Daily practice
              </p>
              <h1 className="text-2xl font-semibold mt-2 mb-3">
                Ready for your next mock interview?
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl">
                Launch a session tailored to the role you&apos;re targeting. Each practice interview includes AI-driven follow-up questions and instant guidance.
              </p>
            </div>
            <Link
              href="/interview"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-lg bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
            >
              Take an Interview
            </Link>
          </section>

          {/* Feature Summary */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Recent sessions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review summaries from your latest interviews.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {interviewHistory.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedInterview(session)}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-left hover:border-black dark:hover:border-white transition"
                >
                  <p className="text-xs uppercase tracking-wide text-gray-500">{session.date}</p>
                  <h3 className="text-base font-semibold mt-2">{session.role}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                    {session.summary}
                  </p>
                  <span className="text-xs font-medium text-gray-500 mt-4 inline-block">
                    View summary →
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Summary Card */}
      {selectedInterview && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedInterview(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{selectedInterview.date}</p>
                <h3 className="text-xl font-semibold mt-1">{selectedInterview.role}</h3>
              </div>
              <button
                onClick={() => setSelectedInterview(null)}
                className="text-sm text-gray-500 hover:text-black dark:hover:text-white"
              >
                Close
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedInterview.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}