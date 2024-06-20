import React, { useState } from 'react';
import axios from "axios"


    // const handleInputChange = (event) => {
        // setQuery(event.target.value);

    // };


const SearchBar = ({setSearchResults}) => {
const [search, setSearch] = useState('')
const [clubinfo, setClubInfo] = useState('')

async function handleInputChange(e)  {
        e.preventDefault();
        try{

            // console.log(search)
            await axios.get('https://findyourclubs.ericsong.cn:8000/search', { params: { clubname: search } })
            .then(
                res=>{
                    if(res.data=="fail"){
                        alert("Club "+search+" does not not exist!")
                    }
                    else{
                        setSearchResults(res.data);
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