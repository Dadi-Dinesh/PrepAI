"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/NavBar.js";

export default function DashboardPage() {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentHistory();
  }, []);

  const fetchRecentHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      // Fetch only the 3 most recent interviews
      const res = await fetch("https://prepai-6jwi.onrender.com/interview/history?page=1&limit=3", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInterviewHistory(data.interviews);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar */}
      <Navbar />

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

            {loading ? (
              <div className="text-sm text-gray-500">Loading recent sessions...</div>
            ) : interviewHistory.length === 0 ? (
              <div className="text-sm text-gray-500 italic">No recent interviews found.</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {interviewHistory.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedInterview(session)}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-left hover:border-black dark:hover:border-white transition flex flex-col h-full"
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-500">{formatDate(session.date)}</p>
                    <h3 className="text-base font-semibold mt-2 mb-2">{session.role}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
                      {session.summary}
                    </p>
                    <span className="text-xs font-medium text-gray-500 mt-4 inline-block">
                      View summary →
                    </span>
                  </button>
                ))}
              </div>
            )}
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
                <p className="text-xs uppercase tracking-wide text-gray-500">{formatDate(selectedInterview.date)}</p>
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