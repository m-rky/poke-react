import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Fetcher from '../../utils/fetch';

const TypeColor = {
  normal: '#A7A87A',
  fire: '#EA7F33',
  fighting: '#BB2E27',
  water: '#6E90EE',
  flying: '#A88FEE',
  grass: '#7DC857',
  poison: '#9D3F9E',
  electric: '#F5D03C',
  ground: '#DDC06C',
  psychic: '#F25686',
  rock: '#B6A03E',
  ice: '#9DD8D8',
  bug: '#A8B82E',
  dragon: '#7136F5',
  ghost: '#705897',
  dark: '#6F5848',
  steel: '#B8B8CF',
  fairy: '#EA98AB',
  '???': '#6CA091',
};

function PokePage(props) {
  const [weight, setWeight] = useState(true);
  const [height, setHeight] = useState(true);
  const [tab, setTab] = useState('Stats');
  const [data, setData] = useState();
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    const getPokemonInfo = async () => {
      const res = await Fetcher(`https://pokeapi.co/api/v2/pokemon/${pid}`);
      setData(res);
    };

    getPokemonInfo();
  }, [pid]);

  if (data !== undefined) {
    return (
      <div className="container p-4 mx-auto">
        <div className="flex justify-between items-end capitalize mb-4">
          <h1 className="text-3xl font-extrabold">
            {data.species.name || data.name}
          </h1>
          <h2 className="text-xl font-lighttext-gray-400">#{data.id}</h2>
        </div>

        <section className="sm:grid sm:grid-cols-2 sm:grid-rows-3)">
          <div className="relative w-full lg:w-3/4 sm:justify-self-center sm:row-span-2">
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              id="blobSvg"
              style={{
                zIndex: '-1',
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '-10%',
                left: '0',
              }}
            >
              <path
                fill="url(#gradient-fill)"
                id="blob"
                d="M390,297Q397,344,368,395Q339,446,278,462Q217,478,179,427Q141,376,92,343.5Q43,311,70,258Q97,205,128.5,176Q160,147,192.5,111.5Q225,76,282,66Q339,56,397.5,87Q456,118,419.5,184Q383,250,390,297Z"
              />
              <defs>
                <linearGradient
                  id="gradient-fill"
                  gradientTransform="rotate(25)"
                >
                  <stop
                    offset="0.4"
                    stopColor={TypeColor[data.types[0].type.name]}
                  />
                  <stop
                    offset="1"
                    stopColor={
                      TypeColor[data.types[1].type.name] ||
                      TypeColor[data.types[0].type.name]
                    }
                    stopOpacity="0.8"
                  />
                </linearGradient>
              </defs>
            </svg>
            <Image
              type={data.types[0].type.name}
              layout="responsive"
              width={150}
              height={150}
              src={data.sprites.other['official-artwork'].front_default}
              style={{ filter: `drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.3))` }}
            />
          </div>

          <ul className="flex space-x-2 mt-8 justify-center sm:(items-center row-start-3)">
            {data.types.map(({ type }) => (
              <li
                className="px-3 py-1 font-semibold capitalize rounded-full font-body"
                key={type.name}
                type={type.name}
                style={{
                  color: TypeColor[type.name],
                  border: `2px solid ${TypeColor[type.name]}`,
                }}
              >
                {type.name}
              </li>
            ))}
          </ul>

          <div className="sm:(row-span-3)">
            <ul className="flex text-xs justify-evenly">
              <button
                className="px-1 py-2 mt-4 text-sm font-bold border-b-2"
                tab={tab}
                label="Overview"
                type="button"
                format={data.types[0].type.name}
                alttype={data.types[1] ? data.types[1].type.name : null}
                onClick={(e) => setTab(e.target.textContent)}
                style={{
                  color:
                    tab === 'Overview'
                      ? TypeColor[data.types[0].type.name]
                      : 'initial',
                  borderBottomColor:
                    tab === 'Overview'
                      ? TypeColor[data.types[0].type.name]
                      : 'initial',
                }}
              >
                Overview
              </button>
              <button
                className="px-1 py-2 mt-4 text-sm font-bold border-b-2"
                tab={tab}
                label="Stats"
                type="button"
                format={data.types[0].type.name}
                alttype={data.types[1] ? data.types[1].type.name : null}
                onClick={(e) => setTab(e.target.textContent)}
                style={{
                  color:
                    tab === 'Stats'
                      ? TypeColor[data.types[0].type.name]
                      : 'initial',
                  borderBottomColor:
                    tab === 'Stats'
                      ? TypeColor[data.types[0].type.name]
                      : 'initial',
                }}
              >
                Stats
              </button>
            </ul>

            {tab === 'Overview' && (
              <div className="mt-8">
                <button
                  type="button"
                  className="flex justify-between my-2 font-body w-full"
                  onClick={() => setWeight(!weight)}
                >
                  <p className="capitalize italic text-sm md:text-lg sm:font-semibold">
                    Weight:
                  </p>
                  {weight ? (
                    <span className="text-xs sm:text-sm md:text-lg">
                      {(data.weight / 4.536).toFixed(1)} lbs
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm md:text-lg">
                      {(data.weight / 10).toFixed(0)} kg
                    </span>
                  )}
                </button>
                <button
                  className="flex justify-between my-2 font-body w-full"
                  type="button"
                  onClick={() => setHeight(!height)}
                >
                  <p className="capitalize italic text-sm md:text-lg sm:font-semibold">
                    Height:
                  </p>
                  {height ? (
                    <span className="text-xs sm:text-sm md:text-lg">{`${Math.trunc(
                      data.height / 3.048
                    )}'${Math.round(data.height * 3.937) % 12}"`}</span>
                  ) : (
                    <span className="text-xs sm:text-sm md:text-lg">{`${
                      data.height / 10
                    }m`}</span>
                  )}
                </button>
                <ul className="flex justify-between my-2 font-body">
                  <p className="capitalize italic text-sm md:text-lg sm:font-semibold">
                    Base Exp:
                  </p>
                  <li className="text-xs sm:text-sm md:text-lg">
                    {data.base_experience} xp
                  </li>
                </ul>
                <div className="flex justify-between">
                  <p className="capitalize italic text-sm md:text-lg sm:font-semibold">
                    Abilities:
                  </p>
                  <div>
                    {data.abilities.map(({ ability }) => (
                      <p
                        className="capitalize text-right text-xs sm:text-sm md:text-lg"
                        key={ability.name}
                        is_hidden={ability.is_hidden}
                      >
                        {ability.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'Stats' && (
              <div className="mt-8 space-y-2">
                {data.stats.map(({ stat, base_stat }) => (
                  <ul
                    key={stat.name}
                    title={`${stat.name.toUpperCase()} has a value of ${base_stat} out of 255 max`}
                    aria-label={`${stat.name.toUpperCase()} has a value of ${base_stat} out of 255 max`}
                  >
                    <li className="uppercase italic md:text-lg">{stat.name}</li>
                    <div className="flex justify-between items-center">
                      <div
                        className="w-full h-4 rounded-full"
                        type={data.types[0].type.name}
                        style={{
                          backgroundColor:
                            TypeColor[data.types[0].type.name] + 40,
                        }}
                      >
                        <div
                          className="h-4 rounded-full"
                          type={data.types[0].type.name}
                          style={{
                            width: `${(Number(base_stat) / 255) * 100}%`,
                            backgroundColor: TypeColor[data.types[0].type.name],
                          }}
                        />
                      </div>
                      <span
                        className="ml-2 font-bold"
                        type={data.types[0].type.name}
                      >
                        {base_stat}
                      </span>
                    </div>
                  </ul>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default PokePage;

export async function getServerSideProps(context) {
  try {
    const pokemon = await Fetcher(
      `https://pokeapi.co/api/v2/pokemon/${context.query.pid}`
    );

    return { props: { pokemon } };
  } catch (error) {
    return { props: { error: JSON.stringify(error) } };
  }
}
