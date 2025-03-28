import React from "react";
import "./SearchResultsList.css"
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({results}) => {
    return (
        <div className="results-list">
              {
                results && results.length > 0 ?
                results.map((result, id) => {
                return <SearchResult result={result} key={id} />;
                }) :
                <div className="results"> No results found.</div>
                } 
        </div>
    );
};
