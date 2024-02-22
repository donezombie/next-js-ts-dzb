"use client";
import Typography from "components/ui/Typography";
import { Button } from "components/ui/button";
import { JWT_AUTH } from "constants/common";
import pageUrls from "constants/pageUrls";
import { removeLangFromPathname } from "helpers/common";
import Cookies from "js-cookie";
import { Lang, languages } from "languages";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "providers/AuthenticationProvider";

export default function PageContent() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const pathname = usePathname();
  const { auth } = useAuth();

  return (
    <div className="p-2">
      <Typography component="h2">{t("Content.Title")}</Typography>
      <Typography component="p" className="mb-2 font-semibold text-lg">
        {t("Common.Homepage")}
      </Typography>

      <div className="mb-2">
        <Link
          href={pageUrls.Secret}
          className="text-blue-500 hover:cursor-pointer"
        >
          {t("Common.GoTo", { link: t("Pages.Secret") })}
        </Link>
      </div>

      <div className="border p-2 rounded-md">
        {languages.map((lang) => {
          const nextPathName = `/${lang}${removeLangFromPathname(pathname)}`;

          if (currentLocale === lang) {
            return null;
          }

          return (
            <Typography component="p" className="text-sm" key={lang}>
              <a href={nextPathName}>
                {lang === Lang.en && "🇬🇧"} {lang === Lang.vi && "🇻🇳"}{" "}
                {t("Locales.SwitchLocale", { locale: lang })}
              </a>
            </Typography>
          );
        })}
      </div>

      {auth ? (
        <div className="mt-2 rounded border p-2">
          <Typography component="p" className="text-sm">
            {t("Common.Username")}: {auth?.name}
          </Typography>
          <Typography component="p" className="text-sm">
            {auth?.token}
          </Typography>
          <Button
            className="mt-2"
            onClick={() => {
              Cookies.remove(JWT_AUTH);
              window.location.reload();
            }}
          >
            {t("Common.Logout")}
          </Button>
        </div>
      ) : (
        <div className="mt-2">
          {[{ label: t("Common.Login"), link: pageUrls.Login }].map((el) => {
            return (
              <Button key={el.label}>
                <Link key={el.link} href={el.link}>
                  {el.label}
                </Link>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
