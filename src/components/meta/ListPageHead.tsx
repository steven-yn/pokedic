import Head from 'next/head';
import React from 'react';
import usePokemonListData from '../../hooks/usePokemonListData';
import ExternalMeta from './ExternalMeta';
import ResourceLink from './ResourceLink';

interface DetailPageProps {
  url: string;
}

const ListPageHead = ({ url }: DetailPageProps) => {
  const { data } = usePokemonListData();

  if (!data) return null;

  const maxFiveNames = data.pages[0].responseData.results
    .slice(0, 5 - data.pages[0].responseData.results.length + 1)
    .flatMap((pokemon) => (pokemon.koNames && pokemon.koNames[0].name) || '')
    .join(', ');

  const title = `포켓몬 도감 - 전체보기`;
  const description = `${maxFiveNames || ''}등 포켓몬 ${
    data.pages[0].responseData.count
  }마리 정보를 확인하세요.`;
  const siteImg = '/pokedic.webp';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ExternalMeta
        title={title}
        description={description}
        siteImg={siteImg}
        url={url}
      />
      <ResourceLink />
    </>
  );
};

export default ListPageHead;
