import React, { useEffect, useState } from 'react';

import Loading from '../components/Loading';
import Paginate from '../components/Paginate';
import PokeGrid from '../components/PokeGrid';
import { getAllPoke, getPokemonData } from '../utils/pokemon';

export default function All() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const baseUrl = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    async function fetchData() {
      let res = await getAllPoke(`${baseUrl}/?limit=12`);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      await loadingPokemon(res.results);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
    fetchData();
  }, [baseUrl]);

  const nextPage = async () => {
    setLoading(true);
    let res = await getAllPoke(nextUrl);
    await loadingPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);
    setLoading(false);
  };

  const prevPage = async () => {
    if (!prevUrl) {
      return;
    }
    setLoading(true);
    let res = await getAllPoke(prevUrl);
    await loadingPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonInfo = await Promise.all(
      data.map(async (pokemon) => {
        let pokeRecord = await getPokemonData(pokemon.url);
        return pokeRecord;
      })
    );
    setPokeData(_pokemonInfo);
  };

  return (
    <React.Fragment>
      {loading ? <Loading text='Loading...' /> : <PokeGrid pokemon={pokeData} />}
      {loading ? null : (
        <Paginate
          goToNextPage={nextUrl ? nextPage : null}
          goToPrevPage={prevUrl ? prevPage : null}
        />
      )}
    </React.Fragment>
  );
}
