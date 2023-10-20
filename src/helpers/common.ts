import { JWT_AUTH } from "constants/common";
import { Auth } from "interfaces/common";
import Cookies from "js-cookie";
import { languages } from "languages";

export const removeLangFromPathname = (pathname: string) => {
  let nextPathname = pathname;
  languages.forEach((lang) => {
    nextPathname = nextPathname.replace(`/${lang}`, "");
  });

  return nextPathname;
};

export const parseAuthFromCookie = () => {
  const authStringify = Cookies.get(JWT_AUTH);
  const auth = JSON.parse(authStringify || "{}");
  return auth as Auth;
};

export const localStorageGlobal = typeof window !== "undefined" && localStorage;
