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

interface PokemonListResultItem extends NamedAPIResource {
  koNames: PokemonName[] | undefined;
}

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
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: PokemonSpecies;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: PokemonTypePast[];
}

interface PokemonResponseWithAdditionalResource extends PokemonResponse {
  koNames: PokemonName[] | undefined;
  evolutionChain: PokemonChainLink | null;
}
interface PokemonFetchResult {
  status: number;
  statusText: string;
  ok: boolean;
  type: ResponseType;
  url: string;
  responseData: PokemonResponseWithAdditionalResource;
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

interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
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

interface PokemonSpeciesResponse {
  names?: PokemonName[];
  evolution_chain?: NamedAPIResource;
}

interface PokemonName {
  language: NamedAPIResource;
  name: string;
}

interface PokemonEvolutionChainResponse {
  id: 7;
  baby_trigger_item: NamedAPIResource | null;
  chain: PokemonChainLink;
}

interface PokemonChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: PokemonEvolutionDetail[];
  evolves_to: PokemonChainLink[];
}

interface PokemonEvolutionDetail {
  item: NamedAPIResource | null;
  trigger: NamedAPIResource;
  gender: number | null;
  held_item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean;
}
