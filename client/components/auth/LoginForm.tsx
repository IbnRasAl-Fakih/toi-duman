"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n";

type LoginFormProps = {
  locale: Locale;
  userId: string;
  password: string;
  onUserIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  dictionary: {
    userId: string;
    password: string;
    userIdPlaceholder: string;
    passwordPlaceholder: string;
    button: string;
    loading: string;
    error: string;
  };
};

export default function LoginForm({
  locale,
  userId,
  password,
  onUserIdChange,
  onPasswordChange,
  dictionary,
}: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      const data = (await response.json()) as { detail?: string };

      if (!response.ok) {
        setError(data.detail ?? dictionary.error);
        return;
      }

      router.push(`/${locale}/invitations`);
      router.refresh();
    } catch {
      setError(dictionary.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        {dictionary.userId}
        <input
          autoComplete="username"
          onChange={(event) => onUserIdChange(event.target.value)}
          placeholder={dictionary.userIdPlaceholder}
          type="text"
          value={userId}
        />
      </label>
      <label>
        {dictionary.password}
        <input
          autoComplete="current-password"
          onChange={(event) => onPasswordChange(event.target.value)}
          placeholder={dictionary.passwordPlaceholder}
          type="password"
          value={password}
        />
      </label>

      {error ? <p className="auth-form__error">{error}</p> : null}

      <button className="button auth-form__button" disabled={isSubmitting} type="submit">
        {isSubmitting ? dictionary.loading : dictionary.button}
      </button>
    </form>
  );
}
