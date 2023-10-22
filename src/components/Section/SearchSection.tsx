import React from 'react';
import NumberFilter from '../NumberFilter/NumberFilter';

const SearchSection = () => {
  return (
    <NumberFilter>
      도감 번호:
      <NumberFilter.StartInput label="시작 번호" />
      ~
      <NumberFilter.EndInput label="시작 번호" />
      <NumberFilter.Submit />
    </NumberFilter>
  );
};

export default SearchSection;
