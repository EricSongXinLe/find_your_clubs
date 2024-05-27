import React, { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        const response = await fetch(`/api/search?query=${query}`);
        if (response.ok) {
            const result = await response.json();
            alert(result);
        } else {
            console.error('Error:', response.status);
        }
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