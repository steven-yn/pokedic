import { getPokemonPage, pokemonPagenate } from '@/utils/pokemonPagenate';
import FetchCore from './FetchCore';
import { pokemonFetchOptions } from './fetchOptions';

class FetchPokemon extends FetchCore {
  private resource = '/pokemon';

  public pokemonList = async ({
    init,
    params,
  }: PokemonListRequest): Promise<PokemonListFetchResult> => {
    const response = await this.request<PokemonListResponse, PaginationParams>(
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

  public pokemon = async ({ pathParam, init }: PokemonRequest) => {
    const response = await this.request<PokemonResponse, undefined>(
      `${this.resource}/${pathParam || Number(0)}`,
      {
        method: 'GET',
        init,
      },
    );

    return response;
  };
}

export default new FetchPokemon(pokemonFetchOptions);
