"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

const QUESTIONS = [
  "Tell me about yourself and your experience relevant to this role.",
  "Describe a challenging problem you solved recently. What was your approach?",
  "How do you handle feedback and iterate on your work?",
];

export default function InterviewPage() {
  const [stage, setStage] = useState("setup");
  const [role, setRole] = useState("Frontend Engineer");
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const textAreaRef = useRef(null);

  const generateSummary = () => {
    const filled = answers.filter((a) => a.trim().length > 0);
    const combined = filled.join(" ");
    const short =
      combined.length > 400 ? combined.slice(0, 390).trimEnd() + "…" : combined || "No answers recorded.";

    return `For the ${role} role, your responses highlighted your experience, problem‑solving approach, and how you handle feedback. Here is a condensed view of what you shared: ${short}`;
  };

  const handleBegin = () => {
    setStage("interview");
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    setIsSummarizing(true);
    setTimeout(() => {
      setSummary(generateSummary());
      setIsSummarizing(false);
      setStage("summary");
    }, 600);
  };

  const handleAnswerChange = (value) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = value;
      return copy;
    });
  };

  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      const instance = new SR();
      instance.continuous = false;
      instance.interimResults = true;
      instance.lang = "en-US";
      recognitionRef.current = instance;
      setVoiceSupported(true);
    }
  }, []);

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    let finalTranscript = answers[currentIndex] || "";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += " " + transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      const combined = (finalTranscript + " " + interimTranscript).trim();
      handleAnswerChange(combined);
      if (textAreaRef.current) {
        textAreaRef.current.value = combined;
      }
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
  };

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
          {stage === "setup" && (
            <>
              <section>
                <p className="text-xs uppercase tracking-wide text-gray-500">Interview setup</p>
                <h1 className="text-3xl font-semibold mt-2 mb-3">Start a new mock interview</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose a role and then begin. You&apos;ll answer a few questions by typing or speaking, and we&apos;ll generate a concise summary for you.
                </p>
              </section>

              <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  >
                    <option>Frontend Engineer</option>
                    <option>Backend Engineer</option>
                    <option>Backend Engineer</option>
                    <option>Product Manager</option>
                    <option>Data Scientist</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleBegin}
                  className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition"
                >
                  Begin Interview
                </button>
              </section>
            </>
          )}

          {stage === "interview" && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Question {currentIndex + 1} of {QUESTIONS.length}
                  </p>
                  <h1 className="text-xl font-semibold mt-2 mb-1">{role} interview</h1>
                </div>
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className="text-xs border px-3 py-1 rounded-full border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition"
                  >
                    {isRecording ? "Stop recording" : "Speak answer"}
                  </button>
                )}
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <p className="text-sm font-medium mb-2">{QUESTIONS[currentIndex]}</p>
                <textarea
                  ref={textAreaRef}
                  rows={6}
                  value={answers[currentIndex]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white resize-none"
                  placeholder="Type your answer here, or use voice input if available."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
                >
                  {currentIndex === QUESTIONS.length - 1 ? "Finish & summarize" : "Next question"}
                </button>
              </div>
            </section>
          )}

          {stage === "summary" && (
            <section className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Interview summary</p>
                <h1 className="text-2xl font-semibold mt-2 mb-2">
                  Your {role} mock interview summary
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is a condensed view of what you shared. Use it to refine your story and prepare for your next session.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                {isSummarizing ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Summarizing your answers…</p>
                ) : (
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{summary}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStage("interview");
                    setCurrentIndex(0);
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition"
                >
                  Review answers
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStage("setup");
                    setAnswers(Array(QUESTIONS.length).fill(""));
                    setSummary("");
                    setCurrentIndex(0);
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
                >
                  Start a new interview
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
