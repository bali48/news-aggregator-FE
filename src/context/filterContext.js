import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchActive((prev) => !prev);
    if (isSearchActive) setSearchTerm("");
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, isSearchActive, handleSearchToggle }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
