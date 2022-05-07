/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/function-component-definition */
import Head from 'next/head';
import { useRouter } from 'next/router';

import config from '../config';
import { Footer } from './Footer';
import { Header } from './Header';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Layout = ({ children }): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;600;800&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <title>
          {config.title} | {router?.query?.pid && router.query.pid}
        </title>
        <meta
          name="description"
          content="Pokemon Mega List, a pretty collection of nearly all Pokemon released to date made using Next.JS"
        />
        <meta
          property="og:image"
          content="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
        />
        <meta
          property="og:description"
          content="Pokemon Mega List, a pretty collection of nearly all Pokemon released to date made using Next.JS"
        />
        <meta property="og:title" content={config.title} />
        <meta property="og:url" content="https://pokemon.marky.dev" />
        <meta property="og:type" content="website" />
      </Head>
      <Header name={config.title} />
      {children}
      <Footer />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Layout;
