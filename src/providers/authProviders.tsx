import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SetStateType } from '@/interfaces/common';
import authServices from '@/services/authServices';
import { isEmpty } from 'lodash';
import { useLogin } from '@/hooks/authentication/useAuthenticationHooks';
import { encodeRefreshToken, getErrorMsg } from '@/helpers';
import { showError } from '@/helpers/toast';
import httpServices from '@/services/httpServices';

interface AuthContextI {
  isLogged: boolean;
  isLogining: boolean;
  accessToken: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAccessToken?: SetStateType<string>;
  setLogged?: SetStateType<boolean>;
  saveInfoUser?: (token: string, refreshToken: string) => void;
}

export const AuthContext = createContext<AuthContextI | null>(null);

interface PayloadSaveInfoI {
  accessToken: string;
  refreshToken: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //! State
  const [isLogged, setLogged] = useState(false);
  const [accessToken, setAccessToken] = useState(``);
  const [refreshToken, setRefreshToken] = useState(``);
  const { mutateAsync: loginMutate, isLoading: isLogining } = useLogin();

  //! Function
  const saveInfoUser = useCallback((payload: PayloadSaveInfoI) => {
    const { accessToken, refreshToken } = payload;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setLogged(true);
    const refreshTokenEncoded = encodeRefreshToken(refreshToken);

    httpServices.attachTokenToHeader(accessToken);
    authServices.saveUserLocalStorage({
      accessToken,
      refreshToken: refreshTokenEncoded,
    });
  }, []);

  //* Check Auth
  useEffect(() => {
    const infoLocalStorage = authServices.getUserLocalStorage();
    if (!isEmpty(infoLocalStorage)) {
      const { accessToken, refreshToken } = infoLocalStorage;
      saveInfoUser({ accessToken, refreshToken });
    }
  }, [saveInfoUser]);

  const login = useCallback(
    async (
      email: string,
      password: string,
      onSuccess?: () => void,
      onError?: () => void,
    ) => {
      await loginMutate(
        { email, password },
        {
          onSuccess: (response) => {
            const { accessToken, refreshToken } = response?.data?.data || {};
            saveInfoUser({ accessToken, refreshToken });
            onSuccess && onSuccess();
          },
          onError: (error) => {
            showError(getErrorMsg(error));
            onError && onError();
          },
        },
      );
    },
    [loginMutate, saveInfoUser],
  );

  const logout = useCallback(() => {
    authServices.clearUserLocalStorage();
    window.location.reload();
  }, []);

  const memoedValue = useMemo(() => {
    return {
      isLogged,
      accessToken,
      refreshToken,
      isLogining,
      login,
      logout,
    };
  }, [isLogged, refreshToken, accessToken, isLogining, login, logout]);

  //! Render
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
