import { AuthForm } from "../AuthForm";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="h2 mb-1">Create your account</h1>
      <p className="muted mb-5 text-sm">Your progress, plan and mistake notebook are saved to your account.</p>
      <AuthForm mode="register" />
    </>
  );
}
