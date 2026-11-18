import { AuthForm } from "../AuthForm";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <h1 className="h2 mb-1">Welcome back</h1>
      <p className="muted mb-5 text-sm">Sign in to continue your preparation.</p>
      <AuthForm mode="login" />
    </>
  );
}
