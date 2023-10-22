import getPokemonIdForUrl from '@/utils/getPokemonIdForUrl';
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
        const pathParam = getPokemonIdForUrl(pokemon.url);
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
    const response = this.request<PokemonResponse, undefined>(
      `${this.resource}/${pathParam || Number(0)}`,
      {
        method: 'GET',
        init,
      },
    );

    const speciesResource = this.request<PokemonSpeciesResponse, undefined>(
      `${this.speciesResource}/${pathParam}`,
      {
        method: 'GET',
      },
    );

    const pokemonWithSpecies = await Promise.all([response, speciesResource]);

    const koNames = pokemonWithSpecies[1].responseData.names?.filter(
      (name) => name.language.name === 'ko',
    );

    let evolutionChain: PokemonChainLink | null = null;

    if (pokemonWithSpecies[1].responseData.evolution_chain) {
      const splitedUrl =
        pokemonWithSpecies[1].responseData.evolution_chain.url.split('/');

      const evolutionChainId = splitedUrl[splitedUrl.length - 2];
      const evolutionChainResponse = await this.request<
        PokemonEvolutionChainResponse,
        undefined
      >(`${this.evolutionChainResource}/${evolutionChainId}`, {
        method: 'GET',
      });

      evolutionChain = evolutionChainResponse.responseData.chain;
    }

    return {
      ...pokemonWithSpecies[0],
      responseData: {
        ...pokemonWithSpecies[0].responseData,
        koNames,
        evolutionChain,
      },
    };
  };
}

export default new FetchPokemon(pokemonFetchOptions);
