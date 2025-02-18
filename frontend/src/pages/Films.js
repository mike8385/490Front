import react, { useState } from "react";
import axios from "axios";
import Header from '../components/Header'
//import FilmList from '../components/filmList'
import FilmInput from "../components/personInput";
import {SearchBar}  from "../components/searchbar"
import { SearchResultsList } from "../components/SearchResultsList";
import { useEffect } from 'react';

export default function Films() {

    const [results, setResults] = useState([]);


    return (
        <>
            <Header />
            <h2> Films Page</h2>

            <div className="search-bar-container">
                <SearchBar setResults={setResults}/>
                <SearchResultsList results={results}/>
                
            </div>

        </>
    )
}

/*Films Page (3):
•    As a user I want to be able to search a film by
 name of film, name of an actor, or genre of the film
•    As a user I want to be able to view details of the film
•    As a user I want to be able to rent a film out to a 
        customer
*/