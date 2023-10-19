import { defaultPokemonsParams } from '@/const';
import FetchCore from './FetchCore';
import { pokemonFetchOptions } from './fetchOptions';

class FetchPokemon extends FetchCore {
  private resource = '/pokemon';

  public pokemons = async (payload?: PokemonRequest) => {
    const { init, params } = payload || {};
    const response = await this.request<PokemonsResponse, ListParams>(
      this.resource,
      {
        method: 'GET',
        init,
        params: params || defaultPokemonsParams,
      },
    );

    return response;
  };
}

export default new FetchPokemon(pokemonFetchOptions);
