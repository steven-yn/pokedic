import {
  DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';
import createQueryClient from '@/services/createQueryClient';

export interface PageProps {
  dehydratedState: DehydratedState;
  url: string;
}

type DehydratedAppProps = AppProps<PageProps>;

export default function App({ Component, pageProps }: DehydratedAppProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="icon" href="/favicon.ico" />
          <meta http-equiv="cache-control" content="max-age=3540" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />

          <meta name="robots" content="all" />
          <meta content="1 Days" name="revisit-after" />
        </Head>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export const inter = Inter({ subsets: ['latin'] });
