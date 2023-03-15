/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unused-imports/no-unused-vars */
import '#/css/tailwind.css';
import '#/css/prism.css';
import '#/styles/style.scss';
import 'katex/dist/katex.css';
import '#/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';

import Analytics from '#/components/analytics';
import { ClientReload } from '#/components/ClientReload';
import LayoutWrapper from '#/components/LayoutWrapper';
import AuthState from '#/context/authentication';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AuthState>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
          </Head>
          {isDevelopment && isSocket && <ClientReload />}
          <Analytics />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </ThemeProvider>
      </SessionProvider>
      <ToastContainer />
    </AuthState>
  );
}
