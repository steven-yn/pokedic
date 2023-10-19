import {
  DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import createQueryClient from '@/utils/createQueryClient';

export interface PageProps {
  dehydratedState: DehydratedState;
}

type DehydratedAppProps = AppProps<PageProps>;

export default function App({ Component, pageProps }: DehydratedAppProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export const inter = Inter({ subsets: ['latin'] });
