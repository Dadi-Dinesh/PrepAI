"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/NavBar";

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
  const [analysis, setAnalysis] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const textAreaRef = useRef(null);

  const handleBegin = () => {
    setStage("interview");
    setCurrentIndex(0);
  };

  const handleNext = async () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    setIsSummarizing(true);
    setStage("summary");

    try {
      const qna = QUESTIONS.map((q, i) => ({ question: q, answer: answers[i] }));
      const response = await fetch(`https://prepai-6jwi.onrender.com/interview/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role, qna }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze interview");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Error analyzing interview:", error);
      setAnalysis({
        summary: "Failed to generate analysis. Please try again.",
        rating: "N/A",
        areasOfFocus: [],
      });
    } finally {
      setIsSummarizing(false);
    }
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
    <div className="min-h-screen flex flex-col">
      {/* Minimal Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-16">
          {stage === "setup" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Step 1 of 3</p>
                <h1 className="text-3xl font-bold tracking-tight">Select your role</h1>
                <p className="text-[var(--muted)]">
                  We&apos;ll tailor the questions to match the position you&apos;re applying for.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Role</label>
                  <div className="relative">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-transparent border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] transition-shadow"
                    >
                      <option>Frontend Engineer</option>
                      <option>Backend Engineer</option>
                      <option>Full Stack Engineer</option>
                      <option>Product Manager</option>
                      <option>Data Scientist</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBegin}
                  className="w-full py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Start Interview
                </button>
              </div>
            </div>
          )}

          {stage === "interview" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                    Question {currentIndex + 1} of {QUESTIONS.length}
                  </p>
                  <h2 className="text-lg font-semibold">{role} Interview</h2>
                </div>
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`flex items - center gap - 2 px - 3 py - 1.5 rounded - full text - xs font - medium transition - all ${isRecording
                      ? "bg-red-500 text-white"
                      : "border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                      }`}
                  >
                    {isRecording ? (
                      <>
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Recording...
                      </>
                    ) : (
                      "Use Voice"
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-xl font-medium leading-relaxed">{QUESTIONS[currentIndex]}</p>
                <textarea
                  ref={textAreaRef}
                  rows={8}
                  value={answers[currentIndex]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] resize-none transition-shadow placeholder:text-[var(--muted)]"
                  placeholder="Type your answer here..."
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {currentIndex === QUESTIONS.length - 1 ? "Finish Interview" : "Next Question"}
                </button>
              </div>
            </div>
          )}

          {stage === "summary" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Results</p>
                <h1 className="text-3xl font-bold tracking-tight">Interview Analysis</h1>
              </div>

              {isSummarizing ? (
                <div className="py-24 flex flex-col items-center justify-center space-y-4">
                  <div className="w-6 h-6 border-2 border-[var(--border)] border-t-[var(--foreground)] rounded-full animate-spin"></div>
                  <p className="text-sm text-[var(--muted)]">Generating feedback...</p>
                </div>
              ) : analysis ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 p-6 border border-[var(--border)] rounded-xl space-y-3">
                      <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Summary</h3>
                      <p className="text-sm leading-relaxed">{analysis.summary}</p>
                    </div>
                    <div className="p-6 border border-[var(--border)] rounded-xl flex flex-col items-center justify-center space-y-2">
                      <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Score</h3>
                      <div className="text-5xl font-bold tracking-tighter">{analysis.rating}</div>
                    </div>
                  </div>

                  <div className="p-6 border border-[var(--border)] rounded-xl space-y-4">
                    <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Key Improvements</h3>
                    <ul className="space-y-3">
                      {analysis.areasOfFocus && analysis.areasOfFocus.map((area, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--foreground)] flex-shrink-0" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStage("setup");
                        setAnswers(Array(QUESTIONS.length).fill(""));
                        setAnalysis(null);
                        setCurrentIndex(0);
                      }}
                      className="px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Start New Interview
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <p className="text-red-500">Failed to load analysis.</p>
                  <button
                    onClick={() => setStage("setup")}
                    className="text-sm underline"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
