import React, { ReactElement } from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import { createEmotionCache } from "../adapters/emotion-cache";
import type { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps): ReactElement => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{"DORAmeter"}</title>
        <meta content="DORAmeter app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
