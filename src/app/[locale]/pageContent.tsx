"use client";
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
      <h2 className="h2">{t("Content.Title")}</h2>
      <p className="mb-2 font-semibold text-lg">{t("Common.Homepage")}</p>

      <div className="border border-green-400 p-2 rounded-md">
        {languages.map((lang) => {
          const nextPathName = `/${lang}${removeLangFromPathname(pathname)}`;

          if (currentLocale === lang) {
            return null;
          }

          return (
            <p key={lang}>
              <Link href={nextPathName} locale={lang} prefetch={false}>
                {lang === Lang.en && "🇬🇧"} {lang === Lang.vi && "🇻🇳"}{" "}
                {t("Locales.SwitchLocale", { locale: lang })}
              </Link>
            </p>
          );
        })}
      </div>

      {auth ? (
        <div className="mt-2 rounded border p-2">
          <div>
            {t("Common.Username")}: {auth?.name}
          </div>
          <div>{auth?.token}</div>
          <button
            className="mt-2"
            onClick={() => {
              Cookies.remove(JWT_AUTH);
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mt-2">
          {[{ label: t("Common.Login"), link: pageUrls.Login }].map((el) => {
            return (
              <Link key={el.link} href={el.link}>
                {el.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
