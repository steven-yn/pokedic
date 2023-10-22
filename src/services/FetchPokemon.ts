import getPokemonIdForUrl from '@/utils/getPokemonIdForUrl';
import { pokemonPagenate } from '@/utils/pokemonPagenate';
import stringToNumber from '@/utils/stringToNumber';
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
    const pokemonListWithSpecies = await Promise.all([
      this.request<PokemonListResponse, PaginationParams>(this.resource, {
        method: 'GET',
        init,
        params: params || pokemonPagenate(1),
      }),
      this.request<PokemonSpeciesListResponse, undefined>(
        this.speciesResource,
        {
          method: 'GET',
        },
      ),
    ]);

    const resultsWithKoNames = await Promise.all(
      pokemonListWithSpecies[0].responseData.results.map((pokemon) => {
        const id = getPokemonIdForUrl(pokemon.url);

        if (stringToNumber(id) > pokemonListWithSpecies[1].responseData.count)
          return pokemon;

        return this.request<PokemonSpeciesResponse, undefined>(
          `${this.speciesResource}/${id}`,
          {
            method: 'GET',
            init,
          },
        )
          .then((species) => {
            return {
              ...pokemon,
              koNames: species.responseData.names?.filter(
                (name) => name.language.name === 'ko',
              ),
            };
          })
          .catch(() => {
            return pokemon;
          });
      }),
    );

    return {
      ...pokemonListWithSpecies[0],
      responseData: {
        ...pokemonListWithSpecies[0].responseData,
        results: resultsWithKoNames,
      },
    };
  };

  public pokemon = async ({
    pathParam,
    init,
  }: PokemonRequest): Promise<PokemonFetchResult> => {
    const pokemonRequest = this.request<PokemonResponse, undefined>(
      `${this.resource}/${pathParam || Number(0)}`,
      {
        method: 'GET',
        init,
      },
    );

    const speciesRequest = this.request<PokemonSpeciesResponse, undefined>(
      `${this.speciesResource}/${pathParam}`,
      {
        method: 'GET',
      },
    );

    const pokemonWithSpecies = await Promise.all([
      pokemonRequest,
      speciesRequest,
    ]);

    const koNames = pokemonWithSpecies[1].responseData.names?.filter(
      (name) => name.language.name === 'ko',
    );

    const koDescription =
      pokemonWithSpecies[1].responseData.flavor_text_entries
        ?.filter((description) => description.language.name === 'ko')
        .map((description) => description.flavor_text.replace(/\n/g, ' '))
        .join(' ') || '';

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
        koDescription,
        evolutionChain,
      },
    };
  };
}

export default new FetchPokemon(pokemonFetchOptions);
