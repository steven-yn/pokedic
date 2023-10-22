import React from 'react';
import NumberFilter from '../NumberFilter/NumberFilter';

const SearchSection = () => {
  return (
    <NumberFilter>
      도감 번호:
      <NumberFilter.StartInput />
      ~
      <NumberFilter.EndInput />
      <NumberFilter.Submit />
    </NumberFilter>
  );
};

export default SearchSection;
