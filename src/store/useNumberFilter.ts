import { create } from 'zustand';
import searchFilterQuery from '@/utils/searchFilterQuery';

interface NumberFilter {
  startNumberInput: number;
  endNumberInput: number;
  setStartNumberInput: (startNumberInput: number) => void;
  setEndNumberInput: (endNumberInput: number) => void;
}

const useNumberFilter = create<NumberFilter>((set) => ({
  startNumberInput:
    typeof window !== 'undefined' ? Number(searchFilterQuery().start) : 0,
  endNumberInput:
    typeof window !== 'undefined' ? Number(searchFilterQuery().end) : 0,
  setStartNumberInput: (startNumberInput: number) =>
    set(() => ({ startNumberInput })),
  setEndNumberInput: (endNumberInput: number) =>
    set(() => ({ endNumberInput })),
}));

export default useNumberFilter;
