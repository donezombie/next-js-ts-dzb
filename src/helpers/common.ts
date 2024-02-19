import { JWT_AUTH } from "constants/common";
import { Auth } from "interfaces/common";
import Cookies from "js-cookie";
import { languages } from "languages";
import { toString } from "lodash";
import moment from "moment";

export const momentInstance = moment;

export const isDefine = (value: any) => !!toString(value);

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

export const isPromise = (value: any) => {
  return Boolean(value && typeof value.then === "function");
};

export const localStorageGlobal = typeof window !== "undefined" && localStorage;
