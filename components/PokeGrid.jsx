import { motion } from 'framer-motion';

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

function PokeGrid({ pokemon }) {
  return (
    <section className="container mx-auto">
      <motion.div
        className="flex flex-wrap justify-around"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {pokemon.map((pokemon) => {
          return <Card key={pokemon.name} pokemon={pokemon} />;
        })}
      </motion.div>
    </section>
  );
}

export default PokeGrid;
