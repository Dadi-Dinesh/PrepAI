"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = process.env.NEXT_BACKEND_URL
  async function signup({ email, password }) {
    try {
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      return data;
    } catch (err) {
      throw err;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup({ email, password });
      router.push("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Create Your Account</h2>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-input-group">
          <label className="auth-label">Email</label>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label">Password</label>
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Sign Up
        </button>

        <p className="auth-text">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="auth-link"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
