"use client";
import pageUrls from "constants/pageUrls";
import { Auth } from "interfaces/common";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import authService from "services/authService";

const AuthenticationContext = React.createContext<{
  auth: Auth | undefined;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logout: () => void;
}>({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthenticationContext);

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  //! State
  const router = useRouter();
  const [auth, setAuth] = useState<Auth | undefined>(authService.getAuthStorage());
  console.log({ auth });

  //! Function
  const login = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      if (username === "donezombie" && password === "donezombie") {
        const user = {
          token:
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb25AdGV4dGJhY2suYWkiLCJpc3MiOiJ0ZXh0YmFjay5haSIsImlhdCI6MTY5Nzc3ODE5OSwiZXhwIjoxNjk3ODY0NTk5fQ.UDiQJ1X2O8kTbXo1dMoFlNDUhJVKFfdNoLy1sYRvQz4",
          name: "donezombie",
        };

        setAuth(user);
        authService.saveAuthToStorage(user);
        router.push(pageUrls.Secret);
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    authService.clearAuthStorage();
    window.location.reload();
  }, []);

  const values = useMemo(() => {
    return {
      auth,
      logout,
      login,
    };
  }, [auth, login, logout]);

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
