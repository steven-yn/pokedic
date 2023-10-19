import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonKeys } from '@/const/queries';
import FetchPokemon from '@/services/FetchPokemon';
import { pokemonPagenate } from '@/utils/pokemonPagenate';

const usePokemonsData = () => {
  const { data, fetchNextPage, fetchStatus } =
    useInfiniteQuery<PokemonFetchResult>({
      queryKey: [pokemonKeys.list],
      queryFn: ({ pageParam = 1 }) =>
        FetchPokemon.pokemons({
          params: pokemonPagenate(pageParam as number),
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.responseData.next === null ? null : lastPage.page;
      },
    });

  return { data, fetchStatus, fetchNextPage };
};

export default usePokemonsData;
