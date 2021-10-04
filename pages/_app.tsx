import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "redux/store";
import DefaultLayout from "layout/DefaultLayout";
import "../styles/styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
export default wrapper.withRedux(appWithTranslation(MyApp));
