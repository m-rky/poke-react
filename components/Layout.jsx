import Head from 'next/head';
import { useRouter } from 'next/router';

import config from '../config';
import { Footer } from './Footer';
import { Header } from './Header';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
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

export default Layout;
