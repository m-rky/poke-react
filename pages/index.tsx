import type { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';
import tw from 'twin.macro';

import Search from '../components/Search';
import config from '../config';
import fetcher from '../utils/fetch';

// eslint-disable-next-line react/function-component-definition
const Index: NextPage = () => {
  const { data } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?limit=${config.numberOfPoke}`,
    fetcher
  );

  return (
    <LandingContainer>
      <Search {...data} />
    </LandingContainer>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(
    `https://pokeapi.co/api/v2/pokemon?limit=${config.numberOfPoke}`
  );

  return {
    props: { data },
  };
};

const LandingContainer = tw.section`container px-4 sm:mx-auto flex flex-col justify-center`;
