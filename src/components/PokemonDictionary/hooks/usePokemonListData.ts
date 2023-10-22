import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { pokemonKeys } from '@/const/queries';
import FetchPokemon from '@/services/FetchPokemon';
import { pagePerItems, pokemonPagenate } from '@/utils/pokemonPagenate';
import stringToNumber from '@/utils/stringToNumber';

const usePokemonListData = () => {
  const { query } = useRouter();
  const startNum = stringToNumber(query.start);
  const endNum = stringToNumber(query.end);
  const { data, fetchNextPage, fetchStatus } =
    useInfiniteQuery<PokemonListFetchResult>({
      queryKey: [pokemonKeys.list],
      queryFn: ({ pageParam = 1 }) => {
        return FetchPokemon.pokemonList({
          params: pokemonPagenate(
            pageParam as number,
            startNum || undefined,
            endNum || undefined,
          ),
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.responseData.next === null ? null : allPages.length + 1;
      },
    });

  const currentPage = data && data.pages.length;
  const isLastPage =
    typeof currentPage !== 'undefined' &&
    endNum - startNum + 1 <= currentPage * pagePerItems(startNum, endNum);

  return { data, fetchStatus, fetchNextPage, isLastPage };
};

export default usePokemonListData;
