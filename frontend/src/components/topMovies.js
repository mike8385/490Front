import React from "react";
import axios from "axios";
import myImage from '../pinkcd.png';
import ticket from '../ticket.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';




export default class Movies extends React.Component {
    state = {
        films: [],
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
                `http://127.0.0.1:5000/topfilms`
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

  function FButton({filmName, index, film, onClick}) {

    const movieInfo = `Film ID: ${film.film_id} 
    Category ID: ${film.category_id} 
    Description: ${film.description}
    Rented: ${film.rented}`;
    

    return (
      <Popup trigger=
      {<button onClick={onClick}>
        <img src={ticket} width={100} height={100}className='Ticket'/>
        {filmName}
        </button>
        }
        >
        <PopupInfo info={movieInfo} />
        </Popup>
    );
  }

  function PopupInfo({info}) {
    return (
      <div>
      {info.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      </div>
    );
  }


/*
When the page loads, the component runs componentDidMount() and makes the GET request to the server at http://127.0.0.1:5000/films.
The server responds with a list of films. This list is saved in the component's state (this.state.films).
React re-renders the component, and the list of films is displayed on the webpage as a list (<ul> with <li> elements).

*/
