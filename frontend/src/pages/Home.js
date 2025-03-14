import Header from '../components/Header'
import logo from '../logo.png';
import myImage from '../pinkcd.png';
import ticket from '../ticket.png';
import './Home.css';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';
import axios from "axios";


import PersonList from '../components/axios';
import PersonInput from '../components/personInput';
import  Movies  from "../components/topMovies";
import  Actors  from "../components/topActors";

export default function Home() {
    const [count, setCount] = useState(0);
    const [films, setFilms] = useState([]);
    const [actors, setActors] = useState([]);



    useEffect(() => {
      fetch("/topfilms")
      .then(response => response.json().then(data => {
          setFilms(data.films);
        })
      );
    }, []);

    useEffect(() => {
      fetch("/topactors")
      .then(response => response.json().then(data => {
          setActors(data.actors);
        })
      );
    }, []);

    function handleClick() {
      setCount(count + 1);
    }


    return (
        <>
            <div className="Home">
            <header className="Home-header">
                <Header />
              <div className="Top5"> 
                <h1>Top 5 Movies </h1>
                <div className="button-container-five">
                <Movies films={films}/>
                </div>
              </div>
              <div className='actors'>
              <h2>Top 5 Actors </h2>
              <div className="button-container-five">
              <Actors actors={actors}/>
              </div>
              </div>
            </header>
          </div>
        </>

    )
}


  


