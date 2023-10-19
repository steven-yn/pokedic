import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import Intersection from './Intersection';
import usePokemonsData from './usePokemonsData';

const Pokemons = ({ children }: PropsWithChildren) => {
  const { fetchStatus, fetchNextPage } = usePokemonsData();

  const action = () => {
    if (fetchStatus === 'fetching') return;
    fetchNextPage();
  };

  return <Intersection action={action}>{children}</Intersection>;
};

const Pages = () => {
  const { data } = usePokemonsData();

  return (
    <>
      {data?.pages.map((result, idx) => {
        return <Pokemons.List key={result.page} idx={idx} />;
      })}
    </>
  );
};

interface ListProps {
  idx: number;
}

const List = ({ idx }: ListProps) => {
  const { data } = usePokemonsData();
  return (
    <>
      {data?.pages[idx].responseData.results.map((pokemon) => {
        return (
          <Pokemons.Item
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

Pokemons.Pages = Pages;
Pokemons.List = List;
Pokemons.Item = Item;

export default Pokemons;
