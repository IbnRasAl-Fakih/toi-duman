"use client";

import Link from "next/link";
import { useState } from "react";
import { Locale } from "@/lib/i18n";

type RegisterFormProps = {
  locale: Locale;
  dictionary: {
    roleLabel: string;
    roleValue: string;
    button: string;
    loading: string;
    error: string;
    successTitle: string;
    successText: string;
    createdId: string;
    createdPassword: string;
    loginLink: string;
  };
};

type RegisterResult = {
  id: string;
  generatedPassword: string;
};

export default function RegisterForm({
  locale,
  dictionary,
}: RegisterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegisterResult | null>(null);

  async function handleRegister() {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
      });

      const data = (await response.json()) as {
        detail?: string;
        id?: string;
        generatedPassword?: string;
      };

      if (!response.ok || !data.id || !data.generatedPassword) {
        setError(data.detail ?? dictionary.error);
        return;
      }

      setResult({
        id: data.id,
        generatedPassword: data.generatedPassword,
      });
    } catch {
      setError(dictionary.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-7 grid gap-[18px]">
      <label className="grid gap-2.5 text-[0.95rem]">
        {dictionary.roleLabel}
        <input
          className="min-h-[54px] rounded-2xl border border-[rgba(116,93,72,0.14)] bg-white/80 px-4 outline-none"
          disabled
          readOnly
          type="text"
          value={dictionary.roleValue}
        />
      </label>

      {error ? (
        <p className="m-0 rounded-2xl bg-[rgba(226,72,72,0.08)] px-3.5 py-3 font-sans text-[0.92rem] font-semibold text-[#c24545]">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="grid gap-4 rounded-[28px] border border-[rgba(116,93,72,0.08)] bg-white/72 p-6 shadow-[0_18px_40px_rgba(102,81,61,0.08)]">
          <h2 className="m-0 text-3xl leading-none">{dictionary.successTitle}</h2>
          <p className="m-0 text-[#72675d]">{dictionary.successText}</p>
          <div className="grid gap-3.5">
            <div className="grid gap-1.5 rounded-3xl border border-[rgba(116,93,72,0.08)] bg-[rgba(255,248,242,0.9)] px-4 py-4">
              <span className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                {dictionary.createdId}
              </span>
              <strong className="font-sans text-[1.05rem]">{result.id}</strong>
            </div>
            <div className="grid gap-1.5 rounded-3xl border border-[rgba(116,93,72,0.08)] bg-[rgba(255,248,242,0.9)] px-4 py-4">
              <span className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                {dictionary.createdPassword}
              </span>
              <strong className="font-sans text-[1.05rem]">
                {result.generatedPassword}
              </strong>
            </div>
          </div>
          <Link
            className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#b78654] px-6 text-center font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
            href={`/${locale}/login`}
          >
            {dictionary.loginLink}
          </Link>
        </div>
      ) : (
        <button
          className="mt-1.5 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#b78654] px-6 text-center font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
          onClick={handleRegister}
          type="button"
        >
          {isSubmitting ? dictionary.loading : dictionary.button}
        </button>
      )}
    </div>
  );
}
