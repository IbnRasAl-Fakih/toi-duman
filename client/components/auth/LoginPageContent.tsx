"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import OneClickRegisterButton from "@/components/auth/OneClickRegisterButton";
import { Locale } from "@/lib/i18n";

type LoginPageContentProps = {
  locale: Locale;
  dictionary: {
    login: {
      userId: string;
      password: string;
      userIdPlaceholder: string;
      passwordPlaceholder: string;
      button: string;
      loading: string;
      error: string;
    };
    register: {
      button: string;
      loading: string;
      error: string;
      successTitle: string;
      successText: string;
      createdId: string;
      createdPassword: string;
      loginLink: string;
    };
    nav: {
      register: string;
    };
  };
};

export default function LoginPageContent({
  locale,
  dictionary,
}: LoginPageContentProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <LoginForm
        dictionary={dictionary.login}
        locale={locale}
        onPasswordChange={setPassword}
        onUserIdChange={setUserId}
        password={password}
        userId={userId}
      />

      <div className="auth-register-inline">
        <p className="auth-register-inline__label">
          Еще нет аккаунта? Зарегистрируйтесь
        </p>

        <OneClickRegisterButton
          className="button auth-form__button"
          dictionary={dictionary.register}
          errorClassName="auth-form__error"
          label={dictionary.nav.register}
          locale={locale}
          onRegistered={(result) => {
            setUserId(result.id);
            setPassword(result.generatedPassword);
          }}
        />
      </div>
    </>
  );
}
