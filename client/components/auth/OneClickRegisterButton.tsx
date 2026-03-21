"use client";

import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Locale } from "@/lib/i18n";

type OneClickRegisterButtonProps = {
  locale: Locale;
  label: string;
  dictionary: {
    button: string;
    loading: string;
    error: string;
    successTitle: string;
    successText: string;
    createdId: string;
    createdPassword: string;
    loginLink: string;
  };
  className?: string;
  errorClassName?: string;
  onRegistered?: (result: RegisterResult) => void;
};

type RegisterResult = {
  id: string;
  generatedPassword: string;
};

export default function OneClickRegisterButton({
  locale,
  label,
  dictionary,
  className,
  errorClassName,
  onRegistered,
}: OneClickRegisterButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegisterResult | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!result) {
      return;
    }

    const { overflow } = document.body.style;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResult(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [result]);

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

  function handleContinue(event: MouseEvent<HTMLAnchorElement>) {
    if (!result) {
      return;
    }

    if (onRegistered) {
      event.preventDefault();
      onRegistered(result);
    }

    setResult(null);
  }

  return (
    <>
      <button
        className={
          className ??
          "inline-flex min-h-11 items-center justify-center rounded-full bg-[#b78654] px-[18px] text-white"
        }
        onClick={handleRegister}
        type="button"
      >
        {isSubmitting ? dictionary.loading : label}
      </button>

      {result && isMounted
        ? createPortal(
            <div className="fixed inset-0 z-[80] grid place-items-center p-6">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,239,221,0.18),transparent_28%),rgba(33,24,19,0.42)] backdrop-blur-[14px]"
                onClick={() => setResult(null)}
              />
              <div className="relative z-[1] w-full max-w-[680px] rounded-[30px] border border-[rgba(116,93,72,0.08)] bg-[radial-gradient(circle_at_top,rgba(255,231,205,0.78),transparent_38%),rgba(255,252,247,0.96)] p-7 shadow-[0_28px_80px_rgba(61,43,30,0.18)]">
                <button
                  aria-label="Close"
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85"
                  onClick={() => setResult(null)}
                  type="button"
                >
                  <span className="absolute h-[1.8px] w-4 rotate-45 rounded-full bg-[#2d2621]" />
                  <span className="absolute h-[1.8px] w-4 -rotate-45 rounded-full bg-[#2d2621]" />
                </button>

                <p className="mb-3 text-[0.92rem] uppercase tracking-[0.14em] text-[#9a6f43]">
                  {label}
                </p>
                <h2 className="m-0 text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.02]">
                  {dictionary.successTitle}
                </h2>
                <p className="mt-3.5 text-[1.05rem] leading-[1.75] text-[#72675d]">
                  {dictionary.successText}
                </p>

                <div className="mt-[22px] grid gap-3.5">
                  <div className="grid gap-1.5 rounded-[18px] border border-[rgba(116,93,72,0.08)] bg-white/80 px-[18px] py-4">
                    <span className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                      {dictionary.createdId}
                    </span>
                    <strong className="font-sans text-[1.05rem]">{result.id}</strong>
                  </div>
                  <div className="grid gap-1.5 rounded-[18px] border border-[rgba(116,93,72,0.08)] bg-white/80 px-[18px] py-4">
                    <span className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#72675d]">
                      {dictionary.createdPassword}
                    </span>
                    <strong className="font-sans text-[1.05rem]">
                      {result.generatedPassword}
                    </strong>
                  </div>
                </div>

                <div className="mt-[22px]">
                  <Link
                    className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#b78654] px-6 text-center font-semibold text-white shadow-[0_14px_34px_rgba(183,134,84,0.22)] transition duration-300 hover:scale-[1.02] hover:brightness-105"
                    href={`/${locale}/login`}
                    onClick={handleContinue}
                  >
                    {dictionary.loginLink}
                  </Link>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

      {error ? (
        <p
          className={
            errorClassName ??
            "m-0 rounded-2xl bg-[rgba(226,72,72,0.08)] px-3.5 py-3 font-sans text-[0.92rem] font-semibold text-[#c24545]"
          }
        >
          {error}
        </p>
      ) : null}
    </>
  );
}
