import { dehydrate } from '@tanstack/react-query';
import createQueryClient from './createQueryClient';

interface Params<P> {
  key: string[];
  callback: () => Promise<P>;
  fetchMode?: 'INFINITE' | 'NORMAL';
}

export default function commonServerSiderProps<P>(resources: Array<Params<P>>) {
  const asyncClousure = async () => {
    const queryClient = createQueryClient();

    await Promise.all(
      resources.map(({ fetchMode, key, callback }) => {
        switch (fetchMode) {
          case 'INFINITE': {
            return queryClient.fetchInfiniteQuery({
              queryKey: key,
              queryFn: callback,
              initialPageParam: 1,
            });
          }

          case 'NORMAL': {
            return queryClient.fetchQuery({
              queryKey: key,
              queryFn: callback,
            });
          }

          default: {
            return queryClient.fetchQuery({
              queryKey: key,
              queryFn: callback,
            });
          }
        }
      }),
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

  return asyncClousure;
}
