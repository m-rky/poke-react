import { motion } from 'framer-motion';
import tw from 'twin.macro';

const loadingCardVariant = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
  },
};

interface AbilityProps {
  ability: { name: string; url: string };
  is_hidden: boolean;
  solid: number;
}

interface StatProps {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

interface HeldItemProps {
  item: { name: string; url: string };
  version_details?: any;
}

interface TypeProps {
  slot?: number;
  type?: { name: string; url: string };
}

interface Pokemon {
  abilities?: AbilityProps[];
  base_experience?: number;
  height?: number;
  id: number;
  name?: string;
  // just setting a general record of strings basically since typing out the sprites is messy
  sprites?: Record<string, string>;
  stats?: StatProps[];
  types?: TypeProps[];
  weight?: number;
  held_items?: HeldItemProps[];
}

interface PokemonProps {
  pokemon: Pokemon;
  key: string;
}

function Card({ pokemon }: PokemonProps): JSX.Element {
  return (
    <CardCore variants={loadingCardVariant}>
      <p># {pokemon.id}</p>
      <PokemonHeader>
        <PokemonName>{pokemon.name}</PokemonName>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </PokemonHeader>

      <PokemonAbilitiesSection>
        <PokemonAbilities>
          <ul>
            {pokemon.abilities.map((ability, i) => {
              return <li key={`${i}__${ability.ability.name}`}>{ability.ability.name}</li>;
            })}
          </ul>

          <ul>
            {pokemon.held_items.map((item, i) => {
              return <li key={i}>{item.item.name}</li>;
            })}
          </ul>

          <ul>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
          </ul>
        </PokemonAbilities>

        <PokemonStats>
          {pokemon.stats.map((stats, i) => {
            return (
              <div key={`${i}__${stats.stat.name}`}>
                <PokemonStatsText>{stats.stat.name}</PokemonStatsText>
                <PokemonStatsBarBackground>
                  <PokemonStatsBarForeground
                    style={{ width: `${(stats.base_stat / 255) * 100}%` }}
                  ></PokemonStatsBarForeground>
                </PokemonStatsBarBackground>
              </div>
            );
          })}
        </PokemonStats>
      </PokemonAbilitiesSection>
      <PokemonTypes>
        {pokemon.types.map((type, i) => {
          return (
            <PokemonTypesTag className={`${type.type.name}`} key={i}>
              {type.type.name}
            </PokemonTypesTag>
          );
        })}
      </PokemonTypes>
    </CardCore>
  );
}

export default Card;

/*
 * Styled section
 * Including interfaces
 */
const CardCore = tw(
  motion.article
)`flex flex-col rounded m-2 py-6 px-5 sm:py-6 sm:px-8 sm:m-4 flex-grow`;

const PokemonHeader = tw.div`flex justify-between items-center`;
const PokemonName = tw.h1`text-2xl sm:text-4xl`;

const PokemonAbilitiesSection = tw.section`flex flex-col justify-between sm:flex-row`;
const PokemonAbilities = tw.div`flex flex-row pb-4 sm:flex-col justify-around`;

const PokemonStats = tw.div`grid grid-cols-2 gap-4 pb-4 sm:pb-0`;
const PokemonStatsText = tw.p`text-xs`;
const PokemonStatsBarBackground = tw.div`bg-gray-300 w-full rounded-full`;
const PokemonStatsBarForeground = tw.div`bg-blue-500 py-2 text-xs text-center rounded-full`;

const PokemonTypes = tw.ul`flex mt-4`;
const PokemonTypesTag = tw.li`mr-2 px-2 py-1 sm:px-3 sm:py-2 rounded-full`;
