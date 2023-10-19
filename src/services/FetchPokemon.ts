import { POKEMON_API_ENDPOINT } from '@/const';
import { getPokemonPage, pokemonPagenate } from '@/utils/pokemonPagenate';
import FetchCore from './FetchCore';
import { pokemonFetchOptions } from './fetchOptions';

class FetchPokemon extends FetchCore {
  private resource = '/pokemon';
  private speciesResource = '/pokemon-species';

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

    const resultsWithKoNames = await Promise.all(
      response.responseData.results.map((pokemon) => {
        const pathParam = pokemon.url.split(POKEMON_API_ENDPOINT)[1];
        return this.request<PokemonSpeciesResponse, undefined>(
          `${this.speciesResource}/${pathParam}`,
          {
            method: 'GET',
            init,
          },
        ).then((species) => {
          return {
            ...pokemon,
            koNames: species.responseData.names?.filter(
              (name) => name.language.name === 'ko',
            ),
          };
        });
      }),
    );

    return {
      ...response,
      responseData: {
        ...response.responseData,
        results: resultsWithKoNames,
      },
      page: getPokemonPage(params?.offset || 1),
    };
  };

  public pokemon = async ({
    pathParam,
    init,
  }: PokemonRequest): Promise<PokemonFetchResult> => {
    const response = await this.request<PokemonResponse, undefined>(
      `${this.resource}/${pathParam || Number(0)}`,
      {
        method: 'GET',
        init,
      },
    );

    const resultsWithKoNames = await this.request<
      PokemonSpeciesResponse,
      undefined
    >(`${this.speciesResource}/${pathParam}`, {
      method: 'GET',
    });

    const koNames = resultsWithKoNames.responseData.names?.filter(
      (name) => name.language.name === 'ko',
    );

    return {
      ...response,
      responseData: {
        ...response.responseData,
        koNames,
      },
    };
  };
}

export default new FetchPokemon(pokemonFetchOptions);
