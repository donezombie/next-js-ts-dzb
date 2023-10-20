import { JWT_AUTH } from "constants/common";
import { parseAuthFromCookie } from "helpers/common";
import { Auth } from "interfaces/common";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";

class AuthService {
  getAuthStorage() {
    const auth = parseAuthFromCookie();
    return isEmpty(auth) ? undefined : auth;
  }

  saveAuthToStorage(user: Auth) {
    Cookies.set(JWT_AUTH, JSON.stringify(user));
  }

  clearAuthStorage() {
    Cookies.remove(JWT_AUTH);
  }
}

export default new AuthService();
