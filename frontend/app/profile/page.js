"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  // Edit Form State
  const [editForm, setEditForm] = useState({
    name: "",
    role: "",
    experience: "",
    location: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchHistory(1);
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://prepai-6jwi.onrender.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setEditForm({
          name: data.name || "",
          role: data.role || "",
          experience: data.experience || "",
          location: data.location || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const fetchHistory = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://prepai-6jwi.onrender.com/interview/history?page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInterviewHistory(data.interviews);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://prepai-6jwi.onrender.com/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        Loading...
      </div>
    );
  }

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
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Profile</p>
                <h1 className="text-2xl font-semibold mt-1">{user?.name || "User"}</h1>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white underline"
              >
                Edit
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium mt-0.5">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Primary role</p>
                <p className="font-medium mt-0.5">{user?.role || "Not set"}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-medium mt-0.5">{user?.experience || "Not set"}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium mt-0.5">{user?.location || "Not set"}</p>
              </div>
              <div>
                <p className="text-gray-500">Completed interviews</p>
                <p className="font-medium mt-0.5">{pagination.total || 0}</p>
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

            {interviewHistory.length === 0 ? (
              <div className="text-sm text-gray-500 italic">No interviews found.</div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-800">
                {interviewHistory.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        {formatDate(session.date)}
                      </p>
                      <p className="text-sm font-medium mt-1">{session.role}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500">View details →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6 text-sm">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => fetchHistory(pagination.page - 1)}
                  className="disabled:opacity-50 hover:underline"
                >
                  Previous
                </button>
                <span className="text-gray-500">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => fetchHistory(pagination.page + 1)}
                  className="disabled:opacity-50 hover:underline"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Edit Profile Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience</label>
                <input
                  type="text"
                  value={editForm.experience}
                  onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  {formatDate(selectedSession.date)}
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
