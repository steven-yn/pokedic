import { dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import createQueryClient from './createQueryClient';

interface Params {
  key: string[];
  callback: (context: GetServerSidePropsContext) => Promise<any>;
  fetchMode?: 'INFINITE' | 'NORMAL';
}

export default function commonServerSiderProps(resources: Array<Params>) {
  const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const queryClient = createQueryClient();
    context.query;
    await Promise.all(
      resources.map(({ fetchMode, key, callback }) => {
        switch (fetchMode) {
          case 'INFINITE': {
            return queryClient.fetchInfiniteQuery({
              queryKey: key,
              queryFn: () => callback(context),
              initialPageParam: 1,
            });
          }

          case 'NORMAL': {
            return queryClient.fetchQuery({
              queryKey: key,
              queryFn: () => callback(context),
            });
          }

          default: {
            return queryClient.fetchQuery({
              queryKey: key,
              queryFn: () => callback(context),
            });
          }
        }
      }),
    );

    return {
      props: {
        url: `${context.req.headers.host}${context.req.url}`,
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

  return getServerSideProps;
}
