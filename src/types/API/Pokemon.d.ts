interface NamedAPIResource {
  name: string;
  url: string;
}

interface PaginationParams {
  limit?: number;
  offset?: number;
}
interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResultItem[];
}

interface PokemonListResultItem extends NamedAPIResource {}

interface PokemonListRequest {
  params: PaginationParams;
  init?: FetchRequestInit;
}

interface PokemonListFetchResult {
  status: number;
  statusText: string;
  ok: boolean;
  type: ResponseType;
  url: string;
  responseData: PokemonListResponse;
  page: number;
}

interface PokemonRequest {
  pathParam?: number | string;
  init?: FetchRequestInit;
}

interface PokemonResponse {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
  game_indices: PokemonGameIndex[];
  held_items: PokemonHeldItemVersion[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: PokemonSpecies;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: PokemonTypePast[];
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface PokemonForm extends NamedAPIResource {}

interface PokemonGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonMoveVersion {
  version_group: NamedAPIResource;
  move_learn_method: NamedAPIResource;
  level_learned_at: number;
}

interface PokemonSpecies extends NamedAPIResource {}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonTypePast {
  generation: NamedAPIResource;
  types: PokemonType[];
}
