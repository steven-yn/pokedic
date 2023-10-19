interface ListParams {
  limit?: number;
  offset?: number;
}
interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonsResultItem[];
}

interface PokemonsResultItem {
  name: string;
  url: string;
}

interface PokemonRequest {
  params: ListParams;
  init?: FetchRequestInit;
}
