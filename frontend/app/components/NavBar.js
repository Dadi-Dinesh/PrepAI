"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full border-b border-[var(--border)] sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          IntelliPrep AI
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-[var(--foreground)] transition-colors">
                  Dashboard
                </Link>
                <Link href="/interview" className="hover:text-[var(--foreground)] transition-colors">
                  Interview
                </Link>
                <Link href="/profile" className="hover:text-[var(--foreground)] transition-colors">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-[var(--foreground)] transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-[var(--foreground)] transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="w-px h-4 bg-[var(--border)] hidden md:block"></div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
