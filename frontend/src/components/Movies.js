import React from 'react'
import axios from 'axios';

export const Movies = ( { films })=> {
    return (
    <div> 
        {films.map(film => <div>{film.title}</div>)}
    </div>
    )
};


export default class M extends React.Component {
    state = {
        persons: []
    }
    
    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then(res => {
            console.log(res);
            this.setState({persons : res.data});
        });
    }


    render() {
        return (
            <ul>
                {this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
        )
    }
}