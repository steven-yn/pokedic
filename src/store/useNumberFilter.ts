import { create } from 'zustand';
import searchFilterQuery from '@/utils/searchFilterQuery';
import stringToNumber from '@/utils/stringToNumber';

interface NumberFilter {
  startNumberInput: number;
  endNumberInput: number;
  setStartNumberInput: (startNumberInput: number) => void;
  setEndNumberInput: (endNumberInput: number) => void;
}

const useNumberFilter = create<NumberFilter>((set) => ({
  startNumberInput: stringToNumber(searchFilterQuery().start || '0'),
  endNumberInput: stringToNumber(searchFilterQuery().end || '0'),
  setStartNumberInput: (startNumberInput: number) =>
    set(() => ({ startNumberInput })),
  setEndNumberInput: (endNumberInput: number) =>
    set(() => ({ endNumberInput })),
}));

export default useNumberFilter;
