import { PAGE_LIMIT } from '@/const';
import { pagePerItems, restItems } from './itemsCalculate';

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
