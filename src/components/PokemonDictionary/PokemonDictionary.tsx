import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import { POKEMON_API_ENDPOINT } from '@/const';
import Intersection from '../Intersection';
import usePokemonListData from './hooks/usePokemonListData';

const PokemonDictionary = ({ children }: PropsWithChildren) => {
  const { fetchStatus, fetchNextPage } = usePokemonListData();

  const action = () => {
    if (fetchStatus === 'fetching') return;
    fetchNextPage();
  };

  return <Intersection action={action}>{children}</Intersection>;
};

interface ListProps {
  results: PokemonListResultItem[];
}

const List = ({ results }: ListProps) => {
  return (
    <>
      {results.map((pokemon) => {
        return (
          <PokemonDictionary.Item
            key={pokemon.name}
            name={pokemon.koNames ? pokemon.koNames[0].name : pokemon.name}
            url={pokemon.url}
          />
        );
      })}
    </>
  );
};

interface ItemProps {
  name: string;
  url: string;
}

const Item = ({ name, url }: ItemProps) => {
  const id = url.split(POKEMON_API_ENDPOINT)[1];

  return (
    <div>
      <Link href={`/${id}`}>{name}</Link>
    </div>
  );
};

PokemonDictionary.List = List;
PokemonDictionary.Item = Item;

export default PokemonDictionary;
