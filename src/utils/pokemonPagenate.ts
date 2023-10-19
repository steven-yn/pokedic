export const pokemonPagenate = (page: number) => {
  return {
    limit: page * 100,
    offset: (page - 1) * 100,
  };
};

export const getPokemonPage = (offset: number) => {
  return Math.ceil(offset / 100) + 1;
};
