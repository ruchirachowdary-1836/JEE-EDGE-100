"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/client";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "register" && form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email address";
    if (mode === "register") {
      if (form.password.length < 8) e.password = "At least 8 characters";
      else if (!/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password)) e.password = "Use at least one letter and one number";
    } else if (!form.password) e.password = "Enter your password";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError("");
    if (!validate()) return;
    setBusy(true);
    try {
      await api(`/api/auth/${mode}`, { body: form });
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };

  const field = (key: "name" | "email" | "password", label: string, type = "text", auto?: string) => (
    <div>
      <label className="label" htmlFor={key}>{label}</label>
      <input id={key} type={type} autoComplete={auto} className="input" value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })} aria-invalid={!!errors[key]} />
      {errors[key] && <p className="mt-1 text-xs font-medium text-rose-500">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {mode === "register" && field("name", "Full name", "text", "name")}
      {field("email", "Email", "email", "email")}
      {field("password", "Password", "password", mode === "login" ? "current-password" : "new-password")}
      {error && <div className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-300">{error}</div>}
      <button className="btn-primary w-full" disabled={busy}>
        {busy && <Loader2 size={16} className="animate-spin" />}
        {mode === "login" ? "Sign in" : "Create account"}
      </button>
      <p className="muted text-center text-sm">
        {mode === "login" ? (
          <>New here? <Link className="link" href="/register">Create an account</Link></>
        ) : (
          <>Already registered? <Link className="link" href="/login">Sign in</Link></>
        )}
      </p>
    </form>
  );
}
