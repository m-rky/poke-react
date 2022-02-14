// import App from "next/app";
import '../styles/global.css';

import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
