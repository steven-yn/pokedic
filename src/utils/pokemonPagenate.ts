export const pokemonPagenate = (page: number) => {
  return {
    limit: 100,
    offset: (page - 1) * 100,
  };
};

export const getPokemonPage = (offset: number) => {
  return Math.trunc(offset / 100) + 1;
};
