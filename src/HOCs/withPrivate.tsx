import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/authentication/useAuthenticationHooks';
import { useEffect } from 'react';
import { RouteBase } from '@/constants/routeUrl';

const withPrivate = (Component: any) => {
  const Auth = (props: any) => {
    const auth = useAuth();
    const router = useRouter();
    const isLogged = auth?.isLogged;

    useEffect(() => {
      if (!isLogged) {
        router.push(RouteBase.Login);
      }
    }, [isLogged]);

    if (!isLogged) {
      return null;
    }

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withPrivate;
