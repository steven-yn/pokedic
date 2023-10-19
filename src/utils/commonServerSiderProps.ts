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
      resources.map(async ({ fetchMode, key, callback }) => {
        switch (fetchMode) {
          case 'INFINITE': {
            await queryClient.fetchInfiniteQuery({
              queryKey: key,
              queryFn: callback,
              initialPageParam: 1,
            });

            break;
          }

          case 'NORMAL': {
            await queryClient.fetchQuery({
              queryKey: key,
              queryFn: callback,
            });

            break;
          }

          default: {
            await queryClient.fetchQuery({
              queryKey: key,
              queryFn: callback,
            });

            break;
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
