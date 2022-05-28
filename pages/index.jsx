import { useEffect, useState } from 'react';
import MinCard from '../components/MinCard';

import Search from '../components/Search';
import config from '../config';
import Fetcher from '../utils/fetch';

const Index = () => {
  const [highlightedPokemon, setHighlightedPokemon] = useState([]);
  const [loaded, setLoaded] = useState([]);

  useEffect(() => {
    const randomSelection = () => Math.floor(Math.random() * 1000);
    const randomPokemon = [];
    for (let i = 0; i <= 5; i++) {
      randomPokemon.push(randomSelection());
    }
    setHighlightedPokemon(randomPokemon);
  }, []);
  useEffect(() => {
    async function getPokemon() {
      const response = await Fetcher(
        `https://pokeapi.co/api/v2/pokemon?limit=${config.numberOfPoke}`
      );
      setLoaded(response);
    }
    void getPokemon();
  }, []);

  return (
    <section className="container px-4 sm:mx-auto flex flex-col justify-center">
      <Search {...loaded} />

      {loaded?.results &&
        highlightedPokemon
          .map((id) => loaded?.results[id])
          .map(({ name }) => <MinCard key={name} id="3" name={name} />)}
    </section>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const data = await Fetcher(
    `https://pokeapi.co/api/v2/pokemon?limit=${config.numberOfPoke}`
  );

  return {
    props: { data },
  };
};
