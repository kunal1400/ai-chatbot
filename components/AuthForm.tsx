"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import Chat from "./Chat";

type Mode = "signin" | "signup" | "magic";

export default function AuthForm({
  initialMode = "signin"
}: {
  initialMode?: Mode;
}) {
  const { user, signIn, signUp, signOut, signInWithOtp } = useAuth();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setMessage(null);
    setError(null);
    setLoading(false);
  };

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode !== "magic" && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn({ email, password });
        if (error) setError(error.message);
        else setMessage("Signed in successfully.");
      } else if (mode === "signup") {
        const { error } = await signUp({ email, password });
        if (error) setError(error.message);
        else
          setMessage(
            "Sign up successful. Check your email if confirmation is required."
          );
      } else {
        // magic link
        const { error } = await signInWithOtp({ email });
        if (error) setError(error.message);
        else setMessage("Magic link sent. Check your email to sign in.");
      }
    } catch (err) {
      setError("Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // Quick UI if already signed in:
  if (user) {
    return (
      <>
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Signed in</h3>
              <p className="text-sm text-gray-600">
                You are signed in as{" "}
                <span className="font-medium">{user.email}</span>
              </p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => signOut()}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
        <Chat />
      </>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold text-center mb-1">Welcome back</h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        {mode === "signup"
          ? "Create an account"
          : mode === "magic"
          ? "Sign in with a magic link"
          : "Sign in to continue"}
      </p>

      <div className="flex items-center justify-center gap-2 mb-5">
        <button
          onClick={() => {
            resetState();
            setMode("signin");
          }}
          className={`px-3 py-1 rounded-full text-sm ${
            mode === "signin"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Sign in
        </button>
        <button
          onClick={() => {
            resetState();
            setMode("signup");
          }}
          className={`px-3 py-1 rounded-full text-sm ${
            mode === "signup"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Sign up
        </button>
        <button
          onClick={() => {
            resetState();
            setMode("magic");
          }}
          className={`px-3 py-1 rounded-full text-sm ${
            mode === "magic"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Magic link
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password (hidden for magic link) */}
        {mode !== "magic" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters.
            </p>
          </div>
        )}

        {/* Error / Message */}
        {(error || message) && (
          <div
            className={`p-3 rounded ${
              error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}
          >
            {error ?? message}
          </div>
        )}

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading
              ? "Working..."
              : mode === "signin"
              ? "Sign in"
              : mode === "signup"
              ? "Create account"
              : "Send magic link"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center text-sm text-gray-500">
        <span>
          {mode === "signin"
            ? "Don't have an account?"
            : mode === "signup"
            ? "Already have an account?"
            : "Prefer password?"}
        </span>{" "}
        {mode === "signin" && (
          <button
            onClick={() => {
              resetState();
              setMode("signup");
            }}
            className="text-indigo-600 font-medium hover:underline ml-1"
          >
            Sign up
          </button>
        )}
        {mode === "signup" && (
          <button
            onClick={() => {
              resetState();
              setMode("signin");
            }}
            className="text-indigo-600 font-medium hover:underline ml-1"
          >
            Sign in
          </button>
        )}
        {mode === "magic" && (
          <button
            onClick={() => {
              resetState();
              setMode("signin");
            }}
            className="text-indigo-600 font-medium hover:underline ml-1"
          >
            Sign in with password
          </button>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">
        <strong>Demo</strong>: try{" "}
        <span className="font-medium">demo@demo.com</span> /{" "}
        <span className="font-medium">Demo@1234</span>
      </div>
    </div>
  );
}
