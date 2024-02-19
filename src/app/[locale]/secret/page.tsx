"use client";

import Typography from "components/ui/Typography";
import { Button } from "components/ui/button";
import { useTranslations } from "next-intl";
import { useAuth } from "providers/AuthenticationProvider";

export default function Secret() {
  const t = useTranslations();
  const { auth, logout } = useAuth();

  return (
    <div className="p-4">
      <Typography component="p" className="mb-2">
        {t("Common.Description")}
      </Typography>

      <div className="border rounded p-3 mb-2">
        <Typography component="p" className="text-sm">
          Name: {auth?.name}
        </Typography>
        <Typography component="p" className="text-sm break-words  ">
          Token: {auth?.token}
        </Typography>
      </div>

      <Button onClick={logout}>{t("Common.Logout")}</Button>
    </div>
  );
}
