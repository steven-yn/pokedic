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
  retry: 1,
};

export const PAGE_LIMIT = 30;
export const POKEAPI_DOMAIN = 'https://pokeapi.co';
export const POKEMON_LIST_ENDPOINT = `${POKEAPI_DOMAIN}/api/v2/pokemon`;
export const IMAGE_SIZE = 128;
