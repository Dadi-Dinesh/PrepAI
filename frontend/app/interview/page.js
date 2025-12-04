"use client";

import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function InterviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            PrepAI
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
          <section>
            <p className="text-xs uppercase tracking-wide text-gray-500">Interview setup</p>
            <h1 className="text-3xl font-semibold mt-2 mb-3">Start a new mock interview</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose a role, confirm your preferred interview length, and begin practicing with live AI follow-up questions.
            </p>
          </section>

          <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white">
                <option>Frontend Engineer</option>
                <option>Backend Engineer</option>
                <option>Product Manager</option>
                <option>Data Scientist</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Session length</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
              </select>
            </div>

            <button className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition">
              Begin Interview
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
