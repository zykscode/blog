/* eslint-disable unused-imports/no-unused-vars */
import '#/css/tailwind.css';
import '#/css/prism.css';
import '#/styles/style.scss';
import 'katex/dist/katex.css';
import '#/styles/globals.css';
import '@fontsource/inter/variable-full.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import Analytics from '#/components/analytics';
import { ClientReload } from '#/components/ClientReload';
import LayoutWrapper from '#/components/LayoutWrapper';
import { siteMetadata } from '#/data/siteMetadata';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Analytics />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
}
