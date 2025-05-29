"use client";
import React, { useState } from "react";
import "./Login.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://backend-service-marketplace.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.success && data.user && Array.isArray(data.user.role)) {
        // Store token if returned
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        const roles = data.user.role;

        // Define priority
        const rolePriority = {
          superadmin: 1,
          admin: 2,
          seller: 3,
          buyer: 4,
        };

        // Find highest priority role
        const sortedRoles = roles.sort((a, b) => rolePriority[a] - rolePriority[b]);
        const topRole = sortedRoles[0];

        // Redirect based on top priority role
        switch (topRole) {
          case "superadmin":
          case "admin":
            router.push("/admin");
            break;
          case "seller":
            router.push("/seller/home");
            break;
          case "buyer":
            router.push("/buyer/home");
            break;
          default:
            setError("Unrecognized role");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn green-btn">
            Continue
          </button>
        </form>

       

        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <button className="login-btn google-btn">
          <img
            src="/assets/google.jpeg"
            style={{ borderRadius: "50%" }}
            alt="Google"
            className="google-icon"
          />
          Continue with Google
        </button>

        <div className="signup-text">
          <hr />
          <span>Don't have an account?</span>
          <hr />
        </div>

        <Link href="/register" className="navLink">
          <button className="login-btn outline-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
