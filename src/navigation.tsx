import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";
import { languages } from "./languages";

export const locales = languages;

export const pathnames = {
  "/": "/",
  "/client": "/client",
  "/client/redirect": "/client/redirect",
  "/nested": {
    en: "/nested",
    vi: "/anidada",
  },
  "/redirect": "/redirect",
  "/news/[articleId]": {
    en: "/news/[articleId]",
    vi: "/noticias/[articleId]",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
