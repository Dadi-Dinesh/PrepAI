"use client";

import Link from "next/link";
import Image from "next/image";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className="logo-text">
          Prep_AI
        </Link>
      </div>
      <div className="nav-right">
        <Link href="/login">
          <button className="nav-btn login-btn">Login</button>
        </Link>

        <Link href="/signup">
          <button className="nav-btn signup-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}
