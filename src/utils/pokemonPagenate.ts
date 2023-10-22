import { PAGE_LIMIT } from '@/const';

export const pagePerItems = (start: number, end: number) => {
  return end - start + 1 > PAGE_LIMIT ? PAGE_LIMIT : end - start + 1;
};

const restItems = (start: number, end: number) => {
  const rest = end - start + 1 - PAGE_LIMIT;
  if (rest < 0) return 0;
  return rest;
};

export const pokemonPagenate = (page: number, start?: number, end?: number) => {
  if (start && end) {
    const offset = start + (page - 1) * pagePerItems(start, end) - 1;
    const limit =
      pagePerItems(start, end) + offset > end
        ? restItems(start, end)
        : pagePerItems(start, end);

    return {
      limit,
      offset,
    };
  }
  return {
    limit: PAGE_LIMIT,
    offset: (page - 1) * PAGE_LIMIT,
  };
};

export const getPokemonPage = (offset: number, pagePerItems: number) => {
  return Math.trunc(offset / pagePerItems) + 1;
};
