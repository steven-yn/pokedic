import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
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

const Pages = () => {
  const { data } = usePokemonListData();

  return (
    <>
      {data?.pages.map((result, idx) => {
        return <PokemonDictionary.List key={result.page} idx={idx} />;
      })}
    </>
  );
};

interface ListProps {
  idx: number;
}

const List = ({ idx }: ListProps) => {
  const { data } = usePokemonListData();
  return (
    <>
      {data?.pages[idx].responseData.results.map((pokemon) => {
        return (
          <PokemonDictionary.Item
            key={pokemon.name}
            name={pokemon.name}
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
  const id = url.split('https://pokeapi.co/api/v2/pokemon/')[1];

  return (
    <div>
      <Link href={`/${id}`}>{name}</Link>
    </div>
  );
};

PokemonDictionary.Pages = Pages;
PokemonDictionary.List = List;
PokemonDictionary.Item = Item;

export default PokemonDictionary;
