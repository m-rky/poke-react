import { useEffect, useState } from 'react';
import MinCard from '../components/MinCard';

import Search from '../components/Search';
import config from '../config';
import Fetcher from '../utils/fetch';

const Index = ({ data }) => {
  const [highlightedPokemon, setHighlightedPokemon] = useState([]);
  const [loaded, setLoaded] = useState(data);

  useEffect(() => {
    const randomSelection = () => Math.floor(Math.random() * 898);
    const randomPokemon = [];
    for (let i = 0; i <= 10; i++) {
      const number = randomSelection();
      const name =
        loaded && loaded.results[number]
          ? loaded.results[number].name
          : 'Loading';
      randomPokemon.push({ id: randomSelection(), name: name });
    }
    setHighlightedPokemon(randomPokemon);
  }, []);

  return (
    <section className="container px-4 sm:mx-auto flex flex-col justify-center">
      <Search {...loaded} />

      <h3 className="font-semibold my-4">Try any of these: </h3>
      <div className="flex flex-wrap space-x-2 justify-center">
        {loaded &&
          highlightedPokemon.map((poke) => (
            <MinCard key={poke.id} name={poke.name} pokeId={poke.id} />
          ))}
      </div>
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
