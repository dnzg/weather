import { CityWrapper } from "components/CityContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CityWrapper>
      <Head>
        <title>Weather Forecast App</title>
        <meta name="description" content="Amazing app for your life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </CityWrapper>
  );
}

export default MyApp;
