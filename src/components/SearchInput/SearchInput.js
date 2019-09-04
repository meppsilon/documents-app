import React from 'react';

const SearchInput = ({ id, value, onChange }) => (
  <input
    id={id}
    name="search"
    type="text"
    className="border border-gray-500 font-light px-4 py-3 md:w-96 w-full"
    placeholder="Search documents..."
    value={value}
    onChange={onChange}
  />
);

export default SearchInput;
