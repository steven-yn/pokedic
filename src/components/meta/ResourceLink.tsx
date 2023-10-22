import Head from 'next/head';
import React from 'react';
import { POKEAPI_DOMAIN } from '@/const';

const ResourceLink = () => {
  return (
    <Head>
      <link href={POKEAPI_DOMAIN} rel="preconnect" />
      <link href={POKEAPI_DOMAIN} rel="dns-prefetch" />
      <link href="https://raw.githubusercontent.com" rel="preconnect" />
      <link href="https://raw.githubusercontent.com" rel="dns-prefetch" />
    </Head>
  );
};

export default ResourceLink;
