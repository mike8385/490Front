import React from "react";
import axios from "axios";
import myImage from '../pinkcd.png';
import ticket from '../person.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';




export default class Actors extends React.Component {
    state = {
        actors: [],
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
                `http://127.0.0.1:5000/topactors`
            )
            .then((response) => { //How to handle the data from the server
                this.setState({ actors: Array.isArray(response.data.actors) ? response.data.actors : [] });
            });
    }
    render() {
        return (
            <ul>
            {this.state.actors.map((actor, index) => (
                <AButton key={actor.actor_id} actorName={`${actor.first_name} ${actor.last_name}`} actor={actor} index={index} />
            ))}
            </ul>
        );
    }
}

  function AButton({actorName, index, actor, onClick}) {

    const topFilms = actor.titles.slice(0, 5).join(', ');
    const actorInfo = `Actor ID: ${actor.actor_id} 
    Film: ${topFilms} 
    Rented: ${actor.rented}`;
    

    return (
      <Popup trigger=
      {<button onClick={onClick}>
        <img src={ticket} width={100} height={100}className='Ticket'/>
        {actorName}
        </button>
        }
        >
        <PopupInfo info={actorInfo} />
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
When the page loads, the component runs componentDidMount() and makes the GET request to the server at http://127.0.0.1:5000/actors.
The server responds with a list of actors. This list is saved in the component's state (this.state.actors).
React re-renders the component, and the list of actors is displayed on the webpage as a list (<ul> with <li> elements).

*/
