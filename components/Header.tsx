import { motion } from 'framer-motion';
import Link from 'next/link';
import tw from 'twin.macro';

interface Props {
  name: string;
}

export const Header = ({ name }: Props): JSX.Element => (
  <HeaderContainer>
    <Link passHref href='/'>
      <MotionHeader initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
        {name}
      </MotionHeader>
    </Link>
    <SubHeader>
      <Link passHref href='/all'>
        <HeaderLink>All</HeaderLink>
      </Link>
      {/* <Link passHref href='/team'>
        <HeaderLink>Teams</HeaderLink>
      </Link> */}
    </SubHeader>
  </HeaderContainer>
);

/*
 * Styled section
 * Including interfaces
 */
const HeaderContainer = tw.nav`container p-4 sm:mx-auto flex flex-col sm:justify-between sm:flex-row`;
const MotionHeader = tw(motion.a)`my-4 text-2xl text-center font-semibold font-title sm:text-4xl`;
const SubHeader = tw.div`flex justify-center px-0.5`;
const HeaderLink = tw.a`self-center text-purple-500 mx-6 text-lg font-bold transition ease-in-out hover:text-purple-300 transform hover:-translate-y-px hover:scale-95`;
