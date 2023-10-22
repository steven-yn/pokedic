import Head from 'next/head';
import React from 'react';
import { IMAGE_SIZE } from '@/const';

interface Props {
  url: string;
  title: string;
  description: string;
  siteImg: string;
}

const ExternalMeta = ({ title, description, siteImg, url }: Props) => {
  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="pokedic" />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />

      <meta name="og:image" content={siteImg} />
      <meta property="og:image:secure_url" content={siteImg} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={IMAGE_SIZE.toString()} />
      <meta property="og:image:height" content={IMAGE_SIZE.toString()} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />

      <meta name="twitter:image" content={siteImg} />

      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default ExternalMeta;
