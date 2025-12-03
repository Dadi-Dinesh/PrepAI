"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar */}
      <nav className="w-full border-b border-black dark:border-white bg-white dark:bg-black sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            PrepAI
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-80 transition-all duration-200"
            >
              Sign Up
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
            alt="Interview background"
            fill
            className="object-cover opacity-20 dark:opacity-10"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Ace Your Next Interview
            <br />
            <span className="text-gray-600 dark:text-gray-400">With AI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Practice with AI-powered mock interviews. Get instant feedback and improve your skills.
          </p>

          {/* Search Component */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Job Roles to Practice"
                className="w-full px-6 py-4 text-lg border-2 border-black dark:border-white rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition-all">
                Search
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg text-lg font-semibold hover:opacity-80 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-black dark:border-white rounded-lg text-lg font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="border border-black dark:border-white rounded-lg p-8 hover:shadow-lg transition-all duration-200">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI Mock Interview</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Practice with AI that adapts to your responses and asks follow-up questions just like a real interviewer.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-black dark:border-white rounded-lg p-8 hover:shadow-lg transition-all duration-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Instant Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Get detailed feedback on your answers immediately after each response, including strengths and areas for improvement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-black dark:border-white rounded-lg p-8 hover:shadow-lg transition-all duration-200">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Skill Weakness Report</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Identify your weak areas with comprehensive reports that track your progress over time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border border-black dark:border-white rounded-lg p-8 hover:shadow-lg transition-all duration-200">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3">Real-time Feedback</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Receive actionable feedback on your communication style, clarity, and technical knowledge as you speak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
