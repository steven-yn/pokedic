import { GetServerSidePropsContext } from 'next';
import React from 'react';
import DetailPageHead from '@/components/meta/DetailPageHead';
import DetailSection from '@/components/Section/DetailSection';
import { pokemonKeys } from '@/const/queries';
import FetchPokemon from '@/services/FetchPokemon';
import commonServerSiderProps from '@/utils/commonServerSiderProps';
import { PageProps } from './_app';

const PokemonDetail = ({ url }: PageProps) => {
  return (
    <>
      <DetailPageHead url={url} />
      <DetailSection />
    </>
  );
};

export const getServerSideProps = commonServerSiderProps([
  {
    key: [pokemonKeys.detail],
    callback: (context: GetServerSidePropsContext) => {
      const { id } = context.query;
      return FetchPokemon.pokemon({
        pathParam: Array.isArray(id) ? id.join('') : id,
      });
    },
    fetchMode: 'NORMAL',
  },
]);

export default PokemonDetail;
