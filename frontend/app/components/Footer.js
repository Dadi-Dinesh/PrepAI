"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function Footer() {
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
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} PrepAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

