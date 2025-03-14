import React from "react";
import axios from "axios";
import myImage from '../pinkcd.png';
import ticket from '../ticket.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export default class Customers extends React.Component {
    state = {
        Customers: [],
    };
    componentDidMount() {   
        /*
            This is a special function in React that automatically runs right 
            after the component is added to the webpage 
            (when the page is ready). 
            This is a great place to load data 
            (like fetching movies from a server).
        */
        axios
            .get(   //telling the app to make a GET request
                `http://127.0.0.1:5000/`
            )
            .then((response) => { //How to handle the data from the server
                this.setState({ films: Array.isArray(response.data.films) ? response.data.films : [] });
            });
    }
    render() {
        return (
            <ul>
            {this.state.films.map((film, index) => (
                <FButton key={film.film_id} filmName={film.title} film={film} index={index} />
            ))}
            </ul>
        );
    }
}




/*
When the page loads, the component runs componentDidMount() and makes the GET request to the server at http://127.0.0.1:5000/films.
The server responds with a list of films. This list is saved in the component's state (this.state.films).
React re-renders the component, and the list of films is displayed on the webpage as a list (<ul> with <li> elements).

*/
