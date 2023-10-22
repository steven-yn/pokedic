import { PAGE_LIMIT } from '@/const';
import betweenValues from './betweenValues';

export const pagePerItems = (start: number, end: number) => {
  if (!start || !end) return PAGE_LIMIT;
  return betweenValues(start, end) > PAGE_LIMIT
    ? PAGE_LIMIT
    : betweenValues(start, end);
};

export const restItems = (start: number, end: number) => {
  const rest = betweenValues(start, end) - PAGE_LIMIT;
  if (rest < 0) return 0;
  return rest;
};
