import Head from 'next/head';
import React from 'react';
import usePokemonDetailData from '../PokemonInfo/hooks/usePokemonDetailData';
import ExternalMeta from './ExternalMeta';
import ResourceLink from './ResourceLink';

interface DetailPageProps {
  url: string;
}

const DetailPageHead = ({ url }: DetailPageProps) => {
  const { data } = usePokemonDetailData();

  if (!data || !data.responseData.koNames) return null;

  const title = `포켓몬 도감 - ${
    data.responseData.koNames[0].name || ''
  }의 정보`;

  const description = data.responseData.koDescription || '';

  const siteImg = data.responseData.sprites.front_default;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url}></link>
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

export default DetailPageHead;
