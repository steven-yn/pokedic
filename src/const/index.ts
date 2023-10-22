import { QueryObserverOptions } from '@tanstack/react-query';
import { getMinToMs } from '@/utils/getTimes';

export const cacheLifeTime = getMinToMs(5);

export const queryClientOptions: QueryObserverOptions = {
  staleTime: cacheLifeTime,
  gcTime: cacheLifeTime,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: false,
  refetchInterval: false,
  retry: 2,
};

export const PAGE_LIMIT = 30;
