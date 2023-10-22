import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { pokemonKeys } from '@/const/queries';
import FetchPokemon from '@/services/FetchPokemon';
import { pagePerItems, pokemonPagenate } from '@/utils/pokemonPagenate';

const usePokemonListData = () => {
  const { query } = useRouter();
  const { data, fetchNextPage, fetchStatus } =
    useInfiniteQuery<PokemonListFetchResult>({
      queryKey: [pokemonKeys.list],
      queryFn: ({ pageParam = 1 }) => {
        return FetchPokemon.pokemonList({
          params: pokemonPagenate(
            pageParam as number,
            Number(query.start),
            Number(query.end),
          ),
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.responseData.next === null ? null : lastPage.page + 1;
      },
    });

  const currentPage = data && data.pages.length;
  const isLastPage =
    typeof currentPage !== 'undefined' &&
    Number(query.end) <=
      currentPage * pagePerItems(Number(query.start), Number(query.end));

  return { data, fetchStatus, fetchNextPage, isLastPage };
};

export default usePokemonListData;
