import createMiddleware from "next-intl/middleware";
import { Lang, languages } from "./i18nOptions";

export default createMiddleware({
  // A list of all locales that are supported
  locales: languages,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: Lang.vi,
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
