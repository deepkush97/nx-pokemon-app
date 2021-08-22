import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Head from 'next/head';

import { Pokemon } from '@nx-pokemon-app/shared-types';

const result = {
  attack: {
    min: 5,
    max: 181,
  },
  defense: {
    min: 5,
    max: 230,
  },
  hp: {
    min: 1,
    max: 255,
  },
  special_attack: {
    min: 10,
    max: 173,
  },
  special_defense: {
    min: 20,
    max: 230,
  },
  speed: {
    min: 5,
    max: 160,
  },
};

const types = {
  Grass: { color: 'text-green-500', icon: 'fab fa-pagelines' },
  Poison: { color: 'text-purple-800', icon: 'fas fa-skull-crossbones' },
  Fire: { color: 'text-red-500', icon: 'fas fa-fire' },
  Flying: { color: 'text-gray-500', icon: 'fas fa-dove' },
  Water: { color: 'text-blue-500', icon: 'fas fa-water' },
  Bug: { color: 'text-yellow-900', icon: 'fas fa-bug' },
  Normal: { color: 'text-gray-500', icon: 'fas fa-walking' },
  Electric: { color: 'text-yellow-400', icon: 'fas fa-bolt' },
  Ground: { color: 'text-yellow-700', icon: 'fas fa-mountain' },
  Fairy: { color: 'text-pink-200', icon: 'fas fa-broom' },
  Fighting: { color: 'text-gray-500', icon: 'fas fa-people-arrows' },
  Psychic: { color: 'text-gray-500', icon: 'fas fa-brain' },
  Rock: { color: 'text-gray-700', icon: 'fas fa-hard-hat' },
  Steel: { color: 'text-gray-400', icon: 'fas fa-stream' },
  Ice: { color: 'text-blue-300', icon: 'fas fa-icicles' },
  Ghost: { color: 'text-purple-800', icon: 'fas fa-ghost' },
  Dragon: { color: 'text-red-600', icon: 'fas fa-dragon' },
  Dark: { color: 'text-gray-900', icon: 'fas fa-moon' },
};

const calcColor = (value: number, type: string) => {
  const max = result[type].max ?? 0;
  const min = result[type].min ?? 0;
  let color = '';
  const percent = Math.round((value / (max - min)) * 100);
  if (percent >= 70) color = 'text-green-500';
  else if (percent >= 30) color = 'text-yellow-500';
  else {
    color = 'text-red-500';
  }
  return color;
};

const PokemonPage = ({
  pokemon: { base, id, name, type },
}: {
  pokemon: Pokemon;
}) => {
  const typeIcon = (t: string) => {
    const icon = types[t];
    return (
      <span key={t} className={icon.color} title={t}>
        <i className={icon.icon}></i>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>{name.english} | Pokemon Explorer</title>
      </Head>
      <div className="bg-cover min-h-screen w-full flex justify-center items-center">
        <div className="w-1/3 bg-white p-5 shadow-lg rounded-xl space-y-4 bg-opacity-60 backdrop-filter backdrop-blur-lg">
          <div className="flex flex-col font-semibold border-r-8 bg-gradient-to-l from-transparent via-blue-200 to-blue-500 border-blue-500">
            <div className="text-2xl p-2">{name.english}</div>
            <small className="text-gray-700 text-xl">
              {name.japanese} / {name.chinese} / {name.french}
            </small>
          </div>

          <div>
            <p className="text-2xl space-x-4">
              Type: {type.map((t) => typeIcon(t))}
            </p>
          </div>

          <div className="card-content divide-y flex flex-col gap-y-3">
            <ul className="text-lg flex flex-col bg-white rounded-md">
              <li className="flex justify-start p-2">
                <div className="w-1/2 font-bold">HP</div>
                <div className={`w-1/2 ${calcColor(base.hp, 'hp')}`}>
                  {' '}
                  {base.hp}
                </div>
              </li>
              <li className="flex justify-start p-2">
                <div className="w-1/2 font-bold">Attack</div>
                <div className={`w-1/2 ${calcColor(base.attack, 'attack')}`}>
                  {' '}
                  {base.attack}
                </div>
              </li>
              <li className="flex justify-start p-2">
                <div className="w-1/2 font-bold">Defense</div>
                <div className={`w-1/2 ${calcColor(base.defense, 'defense')}`}>
                  {' '}
                  {base.defense}
                </div>
              </li>
              <li className="flex justify-start p-2">
                <div className="w-1/2 font-bold">Special Attack</div>
                <div
                  className={`w-1/2 ${calcColor(
                    base.special_attack,
                    'special_attack'
                  )}`}
                >
                  {' '}
                  {base.special_attack}
                </div>
              </li>
              <li className="flex justify-start p-2">
                <div className="w-1/2 font-bold">Special Defense</div>
                <div
                  className={`w-1/2 ${calcColor(
                    base.special_defense,
                    'special_defense'
                  )}`}
                >
                  {' '}
                  {base.special_defense}
                </div>
              </li>
              <li className="flex justify-start p-2">
                <div className="w-1/2 font-bold">Speed</div>
                <div className={`w-1/2 ${calcColor(base.speed, 'speed')}`}>
                  {' '}
                  {base.speed}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/pokemon`);
  const pokemons: Pokemon[] = await response.json();

  const paths = pokemons.map((pokemon) => ({
    params: { id: pokemon.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/pokemon/${params.id}`
  );
  const json = await response.json();
  return {
    props: {
      pokemon: json,
    },
  };
};

export default PokemonPage;
