import React, { useState, useRef, useEffect } from 'react';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef(null);

  // Close search bar if clicked outside, unless there is text in the input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (!searchText.trim()) {  // Only close if search text is empty
          setIsSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchText]);

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon and Input Field */}
      <div
        className={`flex items-center gap-3 rounded-md transition-all duration-400 ${isSearchOpen ? 'border px-3 py-1' : ''} `}
      >
        {isSearchOpen && (
          <input 
            type="text"
            className="grow outline-none dark:bg-slate-900 "
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Update search text
            autoFocus
          />
        )}
        {/* Enlarged Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-6 w-6 opacity-70 cursor-pointer"
          onClick={() => setIsSearchOpen(true)}  // Always open on icon click
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
