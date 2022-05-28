import Link from 'next/link';
import { useEffect, useState } from 'react';

import config from '../config';

export default function Search(data) {
  const [search, setSearch] = useState < string > '';
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState({});
  const [loading, setLoading] = useState < boolean > true;
  const [filtered, setFiltered] = useState < boolean > false;
  const [valid, setValid] = useState < boolean > true;

  useEffect(() => {
    setSearch('');
    setFiltered(false);
    const list = data.results;
    setPokemon(list);
    setLoading(false);
  }, [data.results]);

  const filterNumber = (arr, query) => {
    if (Number(query) < 0 || Number(query) > config.numberOfPoke) {
      setValid(false);
    }
    const indexQuery = Number(query) - 1;
    // maybe change the return into an arr
    return arr[indexQuery];
  };
  const filterName = (arr, query) => {
    // mewtwo comes before mew...
    // bugfix after lol
    if (arr) {
      return arr.find(
        (poke) =>
          poke.name.slice(0, Math.max(0, query.length)) === query.toLowerCase()
      );
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setSearch('');
  };

  useEffect(() => {
    const numReg = new RegExp(`^[0-9]*$/`, 'u');
    // filternumber demands only one object
    // filtername can provide multiple... why am i even separating the two like this
    if (
      search.length > 0 &&
      numReg.test(search) &&
      Number(search) < config.numberOfPoke
    ) {
      setFilteredPokemon(filterNumber(pokemon, search));
      setFiltered(true);
    } else if (!numReg.test(search)) {
      setFilteredPokemon(filterName(pokemon, search));
      setFiltered(true);
    }
  }, [pokemon, search]);

  function PokemonSuggestion(props) {
    return (
      <div className="flex justify-between bg-purple-100 shadow-sm rounded mb-2 p-4">
        <Link passHref href={`/p/${props.url}`}>
          <a className="self-center text-base font-bold text-purple-500 capitalize sm:text-xl">
            {props.name}
          </a>
        </Link>
        <Link passHref href={`/p/${props.url}`}>
          <a className="self-center text-base font-bold text-purple-500 capitalize sm:text-xl">
            {'>'}
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col justify-center">
      {!valid && (
        <div>
          Please enter a number between 1-{config.numberOfPoke} or a Pokemon
          name
        </div>
      )}
      {search.length >= 2 && valid && filtered && filteredPokemon ? (
        <PokemonSuggestion
          name={filteredPokemon.name}
          url={filteredPokemon.url.replace(/\/$/u, '').split('/').pop()}
        />
      ) : null}

      {!loading && (
        <form
          className="flex flex-col sm:flex-row sm:space-x-4"
          onSubmit={submitSearch}
        >
          <input
            className="my-2 py-4 bg-purple-100  sm:flex-1 dark:bg-gray-800 placeholder-purple-500 placeholder-opacity-70 focus:(outline-none ring ring-purple-300 border-purple-300) active:(outline-none  border-purple-300)"
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
        </form>
      )}
    </div>
  );
}

// const SearchSuggestionName = styled.a<StyledSuggestionProp>`
//   :first-of-type {
//     flex: 1 1 0%;
//   }
//   ${tw``}
//   ${({ variant }) =>
//     variant === 'warning' && tw`not-italic font-normal text-red-500`}
// `;
