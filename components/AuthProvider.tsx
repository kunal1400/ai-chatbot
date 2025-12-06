"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

type SignInProps = { email: string; password: string };
type SignUpProps = { email: string; password: string };

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (creds: SignInProps) => Promise<{ error: Error | null }>;
  signUp: (creds: SignUpProps) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  signInWithOtp: (opts: { email: string }) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // initial session
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession ?? null);
        setUser(newSession?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      // cleanup subscription
      // listener might be undefined in some environments; guard it
      (listener as any)?.subscription?.unsubscribe?.();
    };
  }, []);

  async function signIn({ email, password }: SignInProps) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error: error ?? null };
  }

  async function signUp({ email, password }: SignUpProps) {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error ?? null };
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error: error ?? null };
  }

  async function signInWithOtp({ email }: { email: string }) {
    const { error } = await supabase.auth.signInWithOtp({ email });
    return { error: error ?? null };
  }

  const value: AuthContextValue = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithOtp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
