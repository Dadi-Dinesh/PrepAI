"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

const user = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Frontend Engineer",
  experience: "3–5 years",
  location: "Remote",
};

const interviewHistory = [
  {
    id: 1,
    role: "Frontend Engineer",
    date: "Jan 05, 2025",
    summary:
      "You communicated your experience with React, hooks, and state management clearly. Examples showed real project impact, but some answers could be more structured around problem, action, and result.",
    suggestions: [
      "Practice structuring answers using the PAR (Problem–Action–Result) format.",
      "Prepare 2–3 concise stories about complex UI bugs you fixed.",
      "Highlight specific metrics (performance, conversion, reliability) where possible.",
    ],
  },
  {
    id: 2,
    role: "Frontend Engineer (System Design)",
    date: "Dec 20, 2024",
    summary:
      "You showed good intuition about component composition and state ownership. Some trade-off discussions between different patterns could be deeper.",
    suggestions: [
      "Review trade-offs between client-side and server-side rendering.",
      "Practice explaining how you would structure a large React application.",
      "Prepare a clear explanation for how you handle performance bottlenecks.",
    ],
  },
  {
    id: 3,
    role: "Product Thinking",
    date: "Dec 01, 2024",
    summary:
      "You demonstrated empathy for users and understanding of product goals, but some prioritization decisions were not fully justified.",
    suggestions: [
      "Use a simple framework (like impact vs. effort) when prioritizing features.",
      "Practice walking through trade-offs between two competing product ideas.",
      "Focus on how you measure success after shipping a feature.",
    ],
  },
];

export default function ProfilePage() {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            PrepAI
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/dashboard" className="hover:text-black dark:hover:text-white">
              Dashboard
            </Link>
            <Link href="/interview" className="hover:text-black dark:hover:text-white">
              Interview
            </Link>
            <Link href="/profile" className="text-black dark:text-white font-medium">
              Profile
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Body */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
          {/* User Info */}
          <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Profile</p>
              <h1 className="text-2xl font-semibold mt-1">{user.name}</h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium mt-0.5">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Primary role</p>
                <p className="font-medium mt-0.5">{user.role}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-medium mt-0.5">{user.experience}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium mt-0.5">{user.location}</p>
              </div>
              <div>
                <p className="text-gray-500">Completed interviews</p>
                <p className="font-medium mt-0.5">{interviewHistory.length}</p>
              </div>
            </div>
          </section>

          {/* Interview History */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Interview history</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Open a session to see the summary and focused suggestions.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-800">
              {interviewHistory.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">{session.date}</p>
                    <p className="text-sm font-medium mt-1">{session.role}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-500">View details →</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Floating Session Summary & Suggestions */}
      {selectedSession && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {selectedSession.date}
                </p>
                <h3 className="text-xl font-semibold mt-1">{selectedSession.role}</h3>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-sm text-gray-500 hover:text-black dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium mb-1">Summary</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedSession.summary}
                </p>
              </div>

              <div>
                <p className="font-medium mb-1">Suggested focus areas</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {selectedSession.suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


