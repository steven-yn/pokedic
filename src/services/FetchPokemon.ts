import { getPokemonPage, pokemonPagenate } from '@/utils/pokemonPagenate';
import FetchCore from './FetchCore';
import { pokemonFetchOptions } from './fetchOptions';

class FetchPokemon extends FetchCore {
  private resource = '/pokemon';

  public pokemons = async (
    payload?: PokemonRequest,
  ): Promise<PokemonFetchResult> => {
    const { init, params } = payload || {};
    const response = await this.request<PokemonsResponse, ListParams>(
      this.resource,
      {
        method: 'GET',
        init,
        params: params || pokemonPagenate(1),
      },
    );

    return {
      ...response,
      page: getPokemonPage(params?.offset || 1),
    };
  };
}

export default new FetchPokemon(pokemonFetchOptions);
