"use client";

import Link from "next/link";
import { MouseEvent, useState } from "react";
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

      const registerResult = {
        id: data.id,
        generatedPassword: data.generatedPassword,
      };

      setResult(registerResult);
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
        className={className ?? "button button--small"}
        onClick={handleRegister}
        type="button"
      >
        {isSubmitting ? dictionary.loading : label}
      </button>

      {result ? (
        <div className="register-modal" role="dialog" aria-modal="true">
          <div className="register-modal__backdrop" onClick={() => setResult(null)} />
          <div className="register-modal__panel">
            <button
              aria-label="Close"
              className="register-modal__close"
              onClick={() => setResult(null)}
              type="button"
            >
              <span />
              <span />
            </button>

            <p className="eyebrow">{label}</p>
            <h2>{dictionary.successTitle}</h2>
            <p className="register-modal__text">{dictionary.successText}</p>

            <div className="register-modal__grid">
              <div>
                <span>{dictionary.createdId}</span>
                <strong>{result.id}</strong>
              </div>
              <div>
                <span>{dictionary.createdPassword}</span>
                <strong>{result.generatedPassword}</strong>
              </div>
            </div>

            <div className="register-modal__actions">
              <Link
                className="button"
                href={`/${locale}/login`}
                onClick={handleContinue}
              >
                {dictionary.loginLink}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className={errorClassName ?? "header__register-error"}>{error}</p>
      ) : null}
    </>
  );
}
