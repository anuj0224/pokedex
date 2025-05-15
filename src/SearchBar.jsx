import React from 'react';
import search from './assets/search.svg'

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="search-wrap">
        <img
            src={search}
            alt="search icon"
            className="search-icon"
            width='20px'
        />
        <input
          type="text"
          className="search-input body3-fonts"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <span
          className="search-close-icon search-close-icon-visible"
          onClick={() => setSearchTerm('')}
        >
          ×
        </span>
        )}
      </div>
      
    </>
  );
};

export default SearchBar;
