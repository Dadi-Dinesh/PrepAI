"use client";

import Link from "next/link";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { user } = useAuth();

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;

    try {
      const res = await fetch("https://prepai-6jwi.onrender.com/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: feedbackMessage,
          userId: user?.id || null,
        }),
      });

      if (res.ok) {
        alert("Thank you for your feedback!");
        setFeedbackMessage("");
        setIsFeedbackOpen(false);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <footer className="w-full border-t border-black dark:border-white bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Our Mission */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              To democratize interview preparation by providing AI-powered tools that help candidates practice, improve, and succeed in their career journeys.
            </p>
          </div>

          {/* Why AI Mock Interviews */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Why AI Mock Interviews?</h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              Practice anytime, anywhere. Get instant feedback on your responses, identify weaknesses, and build confidence before your real interview.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Have questions? We'd love to hear from you.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-black dark:border-white rounded-full flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-black dark:border-white rounded-full flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-black dark:border-white rounded-full flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="border-t border-black dark:border-white pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Sign Up
            </Link>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="hover:underline text-left"
            >
              Feedback
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} PrepAI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setIsFeedbackOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Submit Feedback</h3>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Feedback
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  rows={4}
                  placeholder="Let us know what you think..."
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFeedbackOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}

