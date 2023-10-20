"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "providers/AuthenticationProvider";

export default function Secret() {
  const t = useTranslations();
  const { auth, logout } = useAuth();

  return (
    <div>
      <p>{t("Common.Description")}</p>

      <div
        style={{
          border: "1px solid #000",
          padding: 12,
          borderRadius: "0.5rem",
          marginBottom: 12,
        }}
      >
        <p>Name: {auth?.name}</p>
        <p>Token: {auth?.token}</p>
      </div>

      <button onClick={logout}>{t("Common.Logout")}</button>
    </div>
  );
}
