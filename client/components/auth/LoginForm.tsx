"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    <form className="mt-7 grid gap-[18px]" onSubmit={handleSubmit}>
      <label className="grid gap-2.5 text-[0.95rem]">
        {dictionary.userId}
        <input
          autoComplete="username"
          className="min-h-[54px] rounded-2xl border border-[rgba(116,93,72,0.14)] bg-white/80 px-4 outline-none"
          onChange={(event) => onUserIdChange(event.target.value)}
          placeholder={dictionary.userIdPlaceholder}
          type="text"
          value={userId}
        />
      </label>
      <label className="grid gap-2.5 text-[0.95rem]">
        {dictionary.password}
        <div className="relative">
          <input
            autoComplete="current-password"
            className="min-h-[54px] w-full rounded-2xl border border-[rgba(116,93,72,0.14)] bg-white/80 px-4 pr-[106px] outline-none"
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder={dictionary.passwordPlaceholder}
            type={isPasswordVisible ? "text" : "password"}
            value={password}
          />
          <button
            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
            className="absolute right-3.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-transparent text-black"
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            {isPasswordVisible ? (
              <EyeOffIcon aria-hidden="true" className="h-5 w-5" />
            ) : (
              <EyeIcon aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </label>

      {error ? (
        <p className="m-0 rounded-2xl bg-[rgba(226,72,72,0.08)] px-3.5 py-3 font-sans text-[0.92rem] font-semibold text-[#c24545]">
          {error}
        </p>
      ) : null}

      <button
        className="mt-1.5 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#b78654] px-6 text-center font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? dictionary.loading : dictionary.button}
      </button>
    </form>
  );
}
