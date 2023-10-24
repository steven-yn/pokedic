import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import getPokemonIdForUrl from '@/utils/getPokemonIdForUrl';
import usePokemonListData from '../../hooks/usePokemonListData';
import Intersection from '../common/Intersection';

interface Props {
  className?: string;
}

const PokemonDictionary = ({
  children,
  className,
}: PropsWithChildren<Props>) => {
  const { fetchStatus, fetchNextPage, isLastPage } = usePokemonListData();

  const handleIntersecting = () => {
    if (fetchStatus === 'fetching' && isLastPage) return;
    fetchNextPage();
  };

  return (
    <main className={className}>
      <Intersection
        handleIntersecting={handleIntersecting}
        isLastPage={isLastPage}
      >
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
  const id = getPokemonIdForUrl(url);

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
