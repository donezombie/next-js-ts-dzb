import { AuthContext } from '@/providers/authProviders';
import authServices from '@/services/authServices';
import { useContext } from 'react';
import { useMutation } from 'react-query';

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};

export const useSignUp = () => {
  return useMutation(authServices.signUp);
};

export const useLogin = () => {
  return useMutation(authServices.login);
};

export const useLogout = () => {
  return useMutation(authServices.logout);
};
