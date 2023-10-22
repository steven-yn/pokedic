import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import { POKEMON_API_ENDPOINT } from '@/const';
import Intersection from '../Intersection';
import usePokemonListData from './hooks/usePokemonListData';

interface Props {
  className?: string;
}

const PokemonDictionary = ({
  children,
  className,
}: PropsWithChildren<Props>) => {
  const { fetchStatus, fetchNextPage, isLastPage } = usePokemonListData();

  const action = () => {
    if (fetchStatus === 'fetching' && isLastPage) return;
    fetchNextPage();
  };

  return (
    <main className={className}>
      <Intersection action={action} isLastPage={isLastPage}>
        {children}
      </Intersection>
      {fetchStatus === 'fetching' && <div>로딩중...</div>}
    </main>
  );
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
  const id = url.split(POKEMON_API_ENDPOINT)[1].replace('/', '');

  return (
    <div style={{ margin: '30px 0' }}>
      <Link href={`/${id}`}>
        {id}.{name}
      </Link>
    </div>
  );
};

PokemonDictionary.List = List;
PokemonDictionary.Item = Item;

export default PokemonDictionary;
