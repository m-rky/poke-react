import { motion } from 'framer-motion';

const loadingCardVariant = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
  },
};

function Card({ pokemon }) {
  return (
    <motion.article
      className="flex flex-col rounded m-2 py-6 px-5 sm:py-6 sm:px-8 sm:m-4 flex-grow"
      variants={loadingCardVariant}
    >
      <p># {pokemon.id}</p>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-4xl`">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>

      <section className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-row pb-4 sm:flex-col justify-around">
          <ul>
            {pokemon?.abilities.map((ability, i) => {
              return (
                <li key={`${i}__${ability.ability.name}`}>
                  {ability.ability.name}
                </li>
              );
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
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4 sm:pb-0">
          {pokemon.stats.map((stats, i) => {
            return (
              <div key={`${i}__${stats.stat.name}`}>
                <p className="text-xs">{stats.stat.name}</p>
                <div className="bg-gray-300 w-full rounded-full">
                  <div
                    className="bg-blue-500 py-2 text-xs text-center rounded-full"
                    style={{ width: `${(stats.base_stat / 255) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <ul className="flex mt-4">
        {pokemon.types.map((type, i) => {
          return (
            <li
              className={`${type.type.name} mr-2 px-2 py-1 sm:px-3 sm:py-2 rounded-full`}
              key={i}
            >
              {type.type.name}
            </li>
          );
        })}
      </ul>
    </motion.article>
  );
}

export default Card;
