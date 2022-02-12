import Link from 'next/link';
import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

import config from '../config';
import { Button } from './core/Button';

type Props = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: { name: string; url: string }[];
};
type DataProps = {
  name: string;
  url: string;
};

export default function Search(data: Props): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [pokemon, setPokemon] = useState<DataProps[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState({} as DataProps);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtered, setFiltered] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);

  useEffect(() => {
    setSearch('');
    setFiltered(false);
    const list = data.results;
    setPokemon(list);
    setLoading(false);
  }, [data.results]);

  const filterNumber = (
    arr: { name: string; url: string }[],
    query: string
  ) => {
    if (Number(query) < 0 || Number(query) > config.numberOfPoke) {
      setValid(false);
    }
    const indexQuery: number = Number(query) - 1;
    // maybe change the return into an arr
    return arr[indexQuery];
  };
  const filterName = (arr: { name: string; url: string }[], query: string) => {
    // mewtwo comes before mew...
    // bugfix after lol
    return arr.find(
      (poke) =>
        poke.name.slice(0, Math.max(0, query.length)) === query.toLowerCase()
    );
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setSearch('');
  };

  useEffect(() => {
    const numReg = new RegExp(`^[0-9]*$`);
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
      <SearchSuggestionBox>
        <Link passHref href={`/p/${props.url}`}>
          <SearchSuggestionName>{props.name}</SearchSuggestionName>
        </Link>
        <Link passHref href={`/p/${props.url}`}>
          <SearchSuggestionName>{'>'}</SearchSuggestionName>
        </Link>
      </SearchSuggestionBox>
    );
  }

  return (
    <SearchContainer>
      {!valid && (
        <div>
          Please enter a number between 1-{config.numberOfPoke} or a Pokemon
          name
        </div>
      )}
      {valid && filtered && filteredPokemon ? (
        <PokemonSuggestion
          name={filteredPokemon.name}
          url={filteredPokemon.url.replace(/\/$/, '').split('/').pop()}
        />
      ) : null}

      {!loading && (
        <SearchField onSubmit={submitSearch}>
          <EditedSearchBar
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
          {/* <Button value='Submit' type='submit' name='Search' variant='primary' /> */}
        </SearchField>
      )}
    </SearchContainer>
  );
}

/*
 * Style section
 * Including interfaces for styled props
 */

type StyledSuggestionProp = {
  variant?: string;
};

const SearchContainer = tw.div`container mx-auto flex flex-col justify-center`;
const SearchField = tw.form`flex flex-col sm:flex-row sm:space-x-4`;
const SearchBar = tw.input`my-2 py-4 bg-purple-100  sm:flex-1 dark:bg-gray-800 placeholder-purple-500 placeholder-opacity-70`;
const EditedSearchBar = styled(SearchBar)`
  text-indent: 1rem;
  ${tw`focus:(outline-none ring ring-purple-300 border-purple-300) active:(outline-none ring ring-purple-300 border-purple-300)`}
`;
const SearchSuggestionBox = tw.div`flex justify-between bg-purple-100 shadow-sm rounded mb-2 p-4`;
const SearchSuggestionName = styled.a<StyledSuggestionProp>`
  :first-of-type {
    flex: 1 1 0%;
  }
  ${tw`self-center text-base font-bold text-purple-500 capitalize sm:text-xl`}
  ${({ variant }) =>
    variant === 'warning' && tw`not-italic font-normal text-red-500`}
`;
