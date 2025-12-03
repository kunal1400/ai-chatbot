"use client";
import React, { useState } from "react";
import Chat from "./Chat";

export default function LoginForm() {
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("Demo@1234");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function validate() {
    if (!email) return "Email is required.";
    // basic email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return "Please enter a valid email.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    // Simulate network delay — remember, this is a UI-only dummy!
    await new Promise((res) => setTimeout(res, 650));

    // Dummy auth logic — accepts the prefilled credentials only
    if (email === "demo@demo.com" && password === "Demo@1234") {
      setError(null);
      setIsLoggedIn(true);
    } else {
      setError(
        "Invalid credentials for this demo. Use demo@demo.com / Demo@1234"
      );
      setIsLoggedIn(false);
    }

    setLoading(false);
  }

  if (isLoggedIn) {
    return <Chat />;
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign in to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-600">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
                aria-label="Email"
                autoComplete="email"
              />
            </label>

            <label className="block relative">
              <span className="text-sm text-gray-600">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your password"
                aria-label="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-8 text-sm text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="mr-2 rounded border-gray-300"
                />
                Remember me
              </label>

              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot?
              </a>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-xs text-gray-500">
            <strong>Demo credentials:</strong>
            <div className="mt-1">
              Email: <span className="font-medium">demo@demo.com</span>
            </div>
            <div>
              Password: <span className="font-medium">Demo@1234</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    );
  }
}
