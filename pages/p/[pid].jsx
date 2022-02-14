import Error from 'next/error';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import tw, { styled } from 'twin.macro';

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

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function PokePage(props) {
  const [weight, setWeight] = useState(true);
  const [height, setHeight] = useState(true);
  const [tab, setTab] = useState('Stats');
  const router = useRouter();
  const { pid } = router.query;
  const { data, error, isValidating } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${pid}`,
    fetcher,
    {
      initialData: props.pokemon,
    }
  );
  if (isValidating) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Error title={error.message || 'Page not found'} statusCode={404} />;
  }
  if (data !== undefined) {
    return (
      <Base>
        <PokeHeader>
          <PokeName>{data.species.name || data.name}</PokeName>
          <PokeNumber>#{data.id}</PokeNumber>
        </PokeHeader>

        <Content>
          <PokeImage>
            <SVG
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              id="blobSvg"
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
                      TypeColor[data.types[1]?.type.name] ||
                      TypeColor[data.types[0].type.name]
                    }
                    stopOpacity="0.8"
                  />
                </linearGradient>
              </defs>
            </SVG>
            <StyledImage
              type={data.types[0].type.name}
              layout="responsive"
              width={150}
              height={150}
              src={data.sprites.other['official-artwork'].front_default}
            />
          </PokeImage>

          <TypeList>
            {data.types.map(({ type }) => (
              <Type key={type.name} type={type.name}>
                {type.name}
              </Type>
            ))}
          </TypeList>

          <Information>
            <SelectorTabs>
              <Tab
                tab={tab}
                label="Overview"
                type={data.types[0].type.name}
                altType={data.types[1]?.type.name}
                onClick={(e) => setTab(e.target.textContent)}
              >
                Overview
              </Tab>
              <Tab
                tab={tab}
                label="Stats"
                type={data.types[0].type.name}
                altType={data.types[1]?.type.name}
                onClick={(e) => setTab(e.target.textContent)}
              >
                Stats
              </Tab>
              {/* <Tab
            tab={tab}
            label='More'
            type={data.types[0].type.name}
            altType={data.types[1]?.type.name}
            onClick={(e) => {
              setTab(e.target.innerText);
            }}
          >
            More
          </Tab> */}
            </SelectorTabs>

            {tab === 'Overview' && (
              <Overview>
                <Attributes onClick={() => setWeight(!weight)}>
                  <SectionName>Weight:</SectionName>
                  {weight ? (
                    <StatNumbers>
                      {(data.weight / 4.536).toFixed(1)} lbs
                    </StatNumbers>
                  ) : (
                    <StatNumbers>
                      {(data.weight / 10).toFixed(0)} kg
                    </StatNumbers>
                  )}
                </Attributes>
                <Attributes onClick={() => setHeight(!height)}>
                  <SectionName>Height:</SectionName>
                  {height ? (
                    <StatNumbers>{`${Math.trunc(data.height / 3.048)}'${
                      Math.round(data.height * 3.937) % 12
                    }"`}</StatNumbers>
                  ) : (
                    <StatNumbers>{`${data.height / 10}m`}</StatNumbers>
                  )}
                </Attributes>
                <Attributes>
                  <SectionName>Base Exp:</SectionName>
                  <StatNumbers> {data.base_experience} xp</StatNumbers>
                </Attributes>
                <Abilities>
                  <SectionName>Abilities: </SectionName>
                  <div>
                    {data.abilities.map(({ ability }) => (
                      <Ability key={ability.name} is_hidden={ability.is_hidden}>
                        {ability.name}
                      </Ability>
                    ))}
                  </div>
                </Abilities>
              </Overview>
            )}

            {tab === 'Stats' && (
              <StatBlock>
                {data.stats.map(({ stat, base_stat }) => (
                  <ul
                    key={stat.name}
                    title={`${stat.name.toUpperCase()} has a value of ${base_stat} out of 255 max`}
                    aria-label={`${stat.name.toUpperCase()} has a value of ${base_stat} out of 255 max`}
                  >
                    <StatName>{stat.name}</StatName>
                    <StatValue>
                      <BarBackground type={data.types[0].type.name}>
                        <StatBar
                          value={(Number(base_stat) / 255) * 100}
                          type={data.types[0].type.name}
                        />
                      </BarBackground>
                      <StatNumber type={data.types[0].type.name}>
                        {base_stat}
                      </StatNumber>
                    </StatValue>
                  </ul>
                ))}
              </StatBlock>
            )}
            {tab === 'Locations' && <div>More tbqh </div>}
          </Information>
        </Content>
      </Base>
    );
  }
}

export default PokePage;

export async function getServerSideProps(context) {
  try {
    const pokemon = await fetcher(
      `https://pokeapi.co/api/v2/pokemon/${context.query.pid}`
    );
    return { props: { pokemon } };
  } catch (error) {
    return { props: { error: JSON.stringify(error) } };
  }
}

/*
 * Styled section
 */
const Base = tw.div`container p-4 mx-auto`;
const Content = tw.section`sm:(grid grid-cols-2 grid-rows-3)
`;
const Information = tw.div`sm:(row-span-3)`;
const StyledImage = styled(Image)`
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.3));
`;
const PokeHeader = tw.div`flex justify-between items-end capitalize mb-4`;
const PokeName = tw.h1`text-3xl font-extrabold font-title`;
const PokeNumber = tw.h2`text-xl font-light font-title text-gray-400`;
const SVG = styled.svg`
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const SelectorTabs = tw.ul`flex text-xs justify-evenly`;
const Tab = styled.li`
  ${tw`px-1 py-2 mt-4 text-sm font-bold border-b-2`}
  &:hover {
    border-bottom: ${({ altType }) =>
      altType ? `2px solid ${TypeColor[altType]}` : `2px solid red`};
  }
  border-bottom: ${({ tab, label, type }) =>
    tab === label && `2px solid ${TypeColor[type]}`};
`;
const Overview = tw.div`mt-8`;
const Attributes = tw.ul`flex justify-between my-2 font-body`;
const TypeList = tw.ul`flex space-x-2 mt-8 justify-center sm:(items-center row-start-3)`;
const Type = styled.li`
  ${tw`px-3 py-1 font-semibold capitalize rounded-full font-body`}
  color: ${({ type }) => TypeColor[type]};
  border: 2px solid ${({ type }) => TypeColor[type]};
`;
const Abilities = tw.div`flex justify-between`;
const StatNumbers = tw.li`text-xs sm:text-sm md:text-lg`;
const Ability = tw.p`capitalize text-right text-xs sm:text-sm md:text-lg`;
const SectionName = tw.p`capitalize italic text-sm md:text-lg sm:font-semibold`;
const PokeImage = tw.div`relative w-full lg:w-3/4 sm:(justify-self-center row-span-2)`;
const StatBlock = tw.div`mt-8 space-y-2`;
const StatName = tw.li`uppercase italic md:text-lg`;
const StatBar = styled.div`
  ${tw`h-4 rounded-full`}
  width: ${({ value }) => Number(value)}%;
  background-color: ${({ type }) => TypeColor[type]};
`;
const BarBackground = styled.div`
  ${tw`w-full h-4 rounded-full`}
  background-color: ${({ type }) => TypeColor[type]}40;
`;
const StatValue = tw.div`flex justify-between items-center`;
const StatNumber = styled.span`
  ${tw`ml-2 font-bold`}
  color: ${({ type }) => TypeColor[type]};
`;
