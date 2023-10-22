import React from 'react';
import { inter } from '@/pages/_app';
import usePokemonListData from '../PokemonDictionary/hooks/usePokemonListData';
import PokemonDictionary from '../PokemonDictionary/PokemonDictionary';

const DictionarySection = () => {
  const { data } = usePokemonListData();

  if (!data) return null;

  return (
    <PokemonDictionary className={inter.className}>
      {data.pages.map((result) => {
        if (result.responseData.results.length === 0) return null;

        return (
          <PokemonDictionary.List
            key={result.responseData.results[0].name}
            results={result.responseData.results}
          />
        );
      })}
    </PokemonDictionary>
  );
};

export default DictionarySection;
