import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { pokemonKeys } from '@/const/queries';
import FetchPokemon from '@/services/FetchPokemon';

const usePokemonDetailData = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: [pokemonKeys.detail],
    queryFn: () => {
      const { id } = router.query;

      return FetchPokemon.pokemon({
        pathParam: Array.isArray(id) ? id.join('') : id,
      });
    },
  });

  return { data };
};

export default usePokemonDetailData;
