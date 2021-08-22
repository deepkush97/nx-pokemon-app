import { Pokemon } from '@nx-pokemon-app/shared-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';

const Index = ({ pokemons: data }) => {
  const [pokemons, _] = useState<Pokemon[]>(data);

  const [showableItems, setShowableItems] = useState<Pokemon[]>(data);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowableItems(
        pokemons.filter((pokemon) =>
          pokemon.name.english.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 500);
    return () => {
      clearInterval(timeout);
    };
  }, [search, pokemons]);

  return (
    <div className="p-4 md:p-10 w-full max-h-full space-y-8">
      <div className="flex justify-center ">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className=" rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Search"
        />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4 h-80v md:h-70v overflow-auto px-4 py-2">
        {showableItems.map((v) => (
          <li key={v.id}>
            <Link href={`/${v.id}`}>
              <a>
                <div className="p-6 bg-white w-full  flex flex-col items-center rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition transform duration-500 cursor-pointer">
                  <div className="text-6xl font-serif">{v.name.english[0]}</div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-700">
                      {v.name.english}
                    </h1>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (_) => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/pokemon`);
  const json = await response.json();
  return {
    props: {
      pokemons: json,
    },
  };
};

export default Index;
