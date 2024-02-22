"use client";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { Auth } from "interfaces/common";
import authService from "services/authService";

type LoginFunction = {
  username: string;
  password: string;
  onSuccess?: () => void;
  onFailed?: () => void;
};

const AuthenticationContext = React.createContext<{
  auth: Auth | undefined;
  login({ password, username }: LoginFunction): void;
  logout(): void;
}>({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthenticationContext);

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  // ! State
  const [auth, setAuth] = useState<Auth | undefined>(
    authService.getAuthStorage()
  );

  // ! Function
  const login = useCallback(
    ({ password, username, onFailed, onSuccess }: LoginFunction) => {
      if (username === "donezombie" && password === "donezombie") {
        const user = {
          token:
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb25AdGV4dGJhY2suYWkiLCJpc3MiOiJ0ZXh0YmFjay5haSIsImlhdCI6MTY5Nzc3ODE5OSwiZXhwIjoxNjk3ODY0NTk5fQ.UDiQJ1X2O8kTbXo1dMoFlNDUhJVKFfdNoLy1sYRvQz4",
          name: "donezombie",
        };

        setAuth(user);
        authService.saveAuthToStorage(user);
        onSuccess && onSuccess();
      } else {
        onFailed && onFailed();
      }
    },
    []
  );

  const logout = useCallback(() => {
    authService.clearAuthStorage();
    window.location.reload();
  }, []);

  const values = useMemo(
    () => ({
      auth,
      logout,
      login,
    }),
    [auth, login, logout]
  );

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
