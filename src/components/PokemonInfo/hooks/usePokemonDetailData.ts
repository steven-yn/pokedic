import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { pokemonKeys } from '@/const/queries';
import FetchPokemon from '@/services/FetchPokemon';

const usePokemonDetailData = () => {
  const router = useRouter();
  const { id } = router.query;
  const pathParam = Array.isArray(id) ? id.join('') : id || '';

  const { data } = useQuery({
    queryKey: [pokemonKeys.detail],
    queryFn: () => {
      return FetchPokemon.pokemon({
        pathParam: pathParam,
      });
    },
  });

  return {
    data,
  };
};

export default usePokemonDetailData;
