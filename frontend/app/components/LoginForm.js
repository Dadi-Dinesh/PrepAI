"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async ({ email, password }) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        {error && <p className="login-error">{error}</p>}

        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>

        <p className="signup-link">
          Don't have an account? 
          <span className="sign-up-text">
          <Link href="/signup">Create Now</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;