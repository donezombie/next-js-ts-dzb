import {
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_TOKEN_URL,
  SIGN_UP_URL,
} from '@/constants/api';
import httpServices from './httpServices';

const USER_LOCAL_STORAGE = `auth`;

class AuthServices {
  signUp(body = { email: ``, password: `` }) {
    return httpServices.post(SIGN_UP_URL, body);
  }

  login(body = { email: ``, password: `` }) {
    return httpServices.post(LOGIN_URL, body);
  }

  logout() {
    return httpServices.get(LOGOUT_URL);
  }

  refreshToken() {
    return httpServices.get(REFRESH_TOKEN_URL);
  }

  saveUserLocalStorage(data = {}) {
    localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(data));
  }

  getUserLocalStorage() {
    const dataUser = localStorage.getItem(USER_LOCAL_STORAGE);
    if (!!dataUser) {
      return JSON.parse(dataUser);
    }
    return {};
  }

  clearUserLocalStorage() {
    localStorage.removeItem(USER_LOCAL_STORAGE);
  }
}

export default new AuthServices();
