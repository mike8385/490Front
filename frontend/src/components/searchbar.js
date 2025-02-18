import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa";
import axios from 'axios'; // Import axios
import "./SearchBar.css";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        axios.get("/searchfilms")
        .then((response) => {

            const films = Array.isArray(response.data) ? response.data : response.data.films;
                const results = films.filter((film) => {
return (film.title && film.title.toLowerCase().includes(value.toLowerCase())) ||
                           (film.first_name && film.first_name.toLowerCase().includes(value.toLowerCase())) ||
                           (film.category_id && film.category_id.toString().includes(value.toLowerCase())) ||
                           (film.category_name && film.category_name.toString().includes(value.toLowerCase()))                });
                setResults(results);
            })


    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };



    return (
        <div className="input-wrapper">
        <FaSearch id="search-icon"/>
        <input 
        placeholder='Type to search...' 
        value={input} 
        onChange={(e) => handleChange(e.target.value)}/>
        <button> Rent </button>
        </div>
        
    );
};
