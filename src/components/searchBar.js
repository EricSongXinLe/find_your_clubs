import React, { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        // Perform search logic here using the query
        alert('Searching for: '+query);
    };

    return (
        <div className='searchBar'>
            <input
                id="searchInput"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
            />
            <img id="searchButton"src={require("../images/search.gif")} onClick={handleSearch}/>
        </div>
    );
};

export default SearchBar;