import { motion } from 'framer-motion';
import tw from 'twin.macro';

import Card from './Card';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.25,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

function PokeGrid({ pokemon }): JSX.Element {
  return (
    <>
      <PokeGridSection>
        <MotionDiv className='' variants={loadingContainerVariants} initial='start' animate='end'>
          {pokemon.map((pokemon) => {
            return <Card key={pokemon.name} pokemon={pokemon} />;
          })}
        </MotionDiv>
      </PokeGridSection>
    </>
  );
}

export default PokeGrid;

/*
 * Styled section
 */
const PokeGridSection = tw.section`container mx-auto`;
const MotionDiv = tw(motion.div)`flex flex-wrap justify-around`;
