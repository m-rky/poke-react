import { motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';
import useSWR from 'swr';
import tw, { styled } from 'twin.macro';

import Search from '../components/Search';
import config from '../config';
import fetcher from '../utils/fetch';

interface Props {
  data: DataProps[];
}
interface DataProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}
interface TileProps {
  variant?: string;
  children: ReactNode;
}

const Tile = (props: TileProps) => {
  return (
    <VariantTile whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} {...props}>
      {props.children}
    </VariantTile>
  );
};

const Index: NextPage<Props> = (props) => {
  const initialData = props.data;
  const { data } = useSWR(
    'https://pokeapi.co/api/v2/pokemon?limit=' + config.numberOfPoke,
    fetcher,
    { initialData }
  );

  return (
    <LandingContainer>
      <Search {...data} />
      {/* <TileSection>
        <Tile variant='primary'>
          <Link passHref href='/cat'>
            <a href='/cat'>Create a team</a>
          </Link>
        </Tile>
        <Tile>
          <Link passHref href='/random'>
            <a href='/random'>Random</a>
          </Link>
        </Tile>
      </TileSection> */}
    </LandingContainer>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const data = await fetcher('https://pokeapi.co/api/v2/pokemon?limit=' + config.numberOfPoke);

  return {
    props: { data },
  };
};

/*
 * Style section
 *  Includes interfaces for styled prop types
 */

interface StyledVariantProps {
  variant?: string;
}

const LandingContainer = tw.section`container px-4 sm:mx-auto flex flex-col justify-center`;
const TileSection = tw.div`flex flex-col space-y-4 sm:flex-row my-2 sm:space-x-4 sm:space-y-0`;
const StyledTile = styled(motion.button)`
  ${tw`flex items-center justify-center p-4 font-bold text-center transition ease-in-out rounded shadow-sm sm:w-1/2 h-28 hover:shadow-lg`}
`;
const VariantTile = styled(StyledTile)<StyledVariantProps>`
  ${({ variant }) =>
    variant === 'primary' ? tw`text-red-500 border-2 border-red-500` : tw`border-2 border-black`}
  ${tw`dark:(bg-black text-white)`}
`;
