import { PAGE_LIMIT } from '@/const';
import betweenValues from './betweenValues';

export const pagePerItems = (start: number, end: number) => {
  if (!start || !end) return PAGE_LIMIT;
  return betweenValues(start, end) > PAGE_LIMIT
    ? PAGE_LIMIT
    : betweenValues(start, end);
};

const restItems = (start: number, end: number) => {
  const rest = betweenValues(start, end) - PAGE_LIMIT;
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
