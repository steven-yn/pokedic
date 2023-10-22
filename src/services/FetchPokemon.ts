import { POKEMON_API_ENDPOINT } from '@/const';
import { pokemonPagenate } from '@/utils/pokemonPagenate';
import FetchCore from './FetchCore';
import { pokemonFetchOptions } from './fetchOptions';

class FetchPokemon extends FetchCore {
  private resource = '/pokemon';
  private speciesResource = '/pokemon-species';
  private evolutionChainResource = '/evolution-chain';

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

    const speciesAndEvolutionResponse = await Promise.all([
      this.request<PokemonSpeciesResponse, undefined>(
        `${this.speciesResource}/${pathParam}`,
        {
          method: 'GET',
        },
      ),
      this.request<PokemonEvolutionChainResponse, undefined>(
        `${this.evolutionChainResource}/${pathParam}`,
        {
          method: 'GET',
        },
      ),
    ]);

    const koNames = speciesAndEvolutionResponse[0].responseData.names?.filter(
      (name) => name.language.name === 'ko',
    );

    const evolutionChain = speciesAndEvolutionResponse[1].responseData.chain;

    return {
      ...response,
      responseData: {
        ...response.responseData,
        koNames,
        evolutionChain,
      },
    };
  };
}

export default new FetchPokemon(pokemonFetchOptions);
