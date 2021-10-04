import DefaultLayout from "layout/DefaultLayout";
import type { AppProps } from "next/app";
import { wrapper } from "redux/store";
import "../styles/styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
export default wrapper.withRedux(MyApp);
