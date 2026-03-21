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
    <div className="auth-form auth-form--register">
      <label>
        {dictionary.roleLabel}
        <input disabled readOnly type="text" value={dictionary.roleValue} />
      </label>

      {error ? <p className="auth-form__error">{error}</p> : null}

      {result ? (
        <div className="register-result">
          <h2>{dictionary.successTitle}</h2>
          <p>{dictionary.successText}</p>
          <div className="register-result__grid">
            <div>
              <span>{dictionary.createdId}</span>
              <strong>{result.id}</strong>
            </div>
            <div>
              <span>{dictionary.createdPassword}</span>
              <strong>{result.generatedPassword}</strong>
            </div>
          </div>
          <Link className="button auth-form__button" href={`/${locale}/login`}>
            {dictionary.loginLink}
          </Link>
        </div>
      ) : (
        <button
          className="button auth-form__button"
          onClick={handleRegister}
          type="button"
        >
          {isSubmitting ? dictionary.loading : dictionary.button}
        </button>
      )}
    </div>
  );
}
