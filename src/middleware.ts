import createMiddleware from "next-intl/middleware";
import { pathnames } from "./navigation";
import { Lang, languages } from "./languages";
import { NextRequest, NextResponse } from "next/server";
import { JWT_AUTH } from "./constants/common";
import { isEmpty } from "lodash";
import pageUrls from "./constants/pageUrls";
import { Auth } from "./interfaces/common";

const locales = languages;
const publicPages = [
  pageUrls.Homepage,
  pageUrls.Login,
  // (/secret requires auth)
];

const intlMiddleware = createMiddleware({
  defaultLocale: Lang.vi,
  localePrefix: "as-needed",
  pathnames,
  locales,
});

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const auth = JSON.parse(req.cookies.get(JWT_AUTH)?.value || "{}") as Auth;
  const isLogged = !isEmpty(auth);

  // console.log({ isLogged, auth });

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(pathname);

  if (!isLogged && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLogged && pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  return intlMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!_next|.*\\..*).*)"],
  runtime: "experimental-edge",
  unstable_allowDynamic: ["**/node_modules/lodash/**/*.js"],
};
