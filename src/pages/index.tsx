import { GetServerSidePropsContext } from 'next';
import ListPageHead from '@/components/meta/ListPageHead';
import DictionarySection from '@/components/Section/DictionarySection';
import SearchSection from '@/components/Section/SearchSection';
import { pokemonKeys } from '@/const/queries';
import commonServerSiderProps from '@/services/commonServerSiderProps';
import FetchPokemon from '@/services/fetch/FetchPokemon';
import { pokemonPagenate } from '@/utils/pokemonPagenate';
import stringToNumber from '@/utils/stringToNumber';
import { PageProps } from './_app';

const PokemonList = ({ url }: PageProps) => {
  return (
    <>
      <ListPageHead url={url} />
      <h1>POKEDIC</h1>
      <SearchSection />
      <DictionarySection />
    </>
  );
};

export const getServerSideProps = commonServerSiderProps([
  {
    key: [pokemonKeys.list],
    callback: (context: GetServerSidePropsContext) => {
      const { query } = context;
      const { start, end } = query;
      return FetchPokemon.pokemonList({
        params: pokemonPagenate(1, stringToNumber(start), stringToNumber(end)),
      });
    },

    fetchMode: 'INFINITE',
  },
]);

export default PokemonList;
