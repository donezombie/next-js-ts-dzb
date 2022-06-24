import React from 'react';
import { AppProps } from 'next/app';
import createEmotionCache from '@/themes/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/theme';
import Head from 'next/head';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from '@/providers/authProviders';
import i18n from '@/i18n';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { TIMEOUT_CLOSE_TOAST } from '@/constants/enum';
import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import FixFOUC from '@/components/FixFOUC';
import useLang, { LANG } from '@/hooks/useLang';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const client = new QueryClient();

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const { changeLang } = useLang();

  //* Check lang
  React.useEffect(() => {
    const currentLang = localStorage.getItem(LANG);
    if (currentLang) {
      changeLang(currentLang);
    }
  }, [changeLang]);

  //* Remove the server-side injected CSS.
  React.useEffect(() => {
    const jssStyles = document.querySelector(`#jss-server-side`);
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <Head>
                <title>Arcadia</title>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <CssBaseline />
              <ToastContainer
                position="top-right"
                autoClose={TIMEOUT_CLOSE_TOAST}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <FixFOUC>
                <Component {...pageProps} />
              </FixFOUC>
            </AuthProvider>
          </I18nextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
