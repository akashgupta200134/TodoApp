"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Capture error from NextAuth redirect (e.g., CredentialsSignin)
useEffect(() => {
  if (!searchParams) return;
  const err = searchParams.get("error");
  if (err === "CredentialsSignin") setError("Invalid email or password");
  else if (err) setError(err);
}, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) setError("Invalid email or password");
    else router.push("/");
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-3xl font-semibold mb-4 text-center">Sign In</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-3 items-center">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Sign in with Google
        </button>

        <p className="text-sm mt-2">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
