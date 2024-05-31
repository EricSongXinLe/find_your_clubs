import React, { useState } from 'react';
import axios from "axios"


    // const handleInputChange = (event) => {
        // setQuery(event.target.value);

    // };


const SearchBar = () => {
const [search, setSearch] = useState('')
const [clubinfo, setClubInfo] = useState('')

const [query, setQuery] = useState('');

async function handleInputChange(e)  {
        e.preventDefault();
        try{

            // console.log(search)
            await axios.get('http://localhost:8000/search', { params: { clubname: search } })
            .then(
                res=>{
                    if(res.data=="fail"){
                        alert("Club not exist!")
                    }
                    else{
                        setClubInfo(res.data);
                        
                    }
                }
            ).catch((e)=>
                console.log(e)
            )        
        }
        catch(e){
            console.log(e);
        }
        // console.log(clubinfo["clubname"])
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
                // value={query}
                // onChange={handleInputChange}
                onChange={(e) => { setSearch(e.target.value) }}
            />
            <img id="searchButton"src={require("../images/search.gif")} onClick={handleInputChange}
            // onClick={handleSearch}
            />
        </div>
    );
};

export default SearchBar;