import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa";
import axios from 'axios'; // Import axios
import "./SearchBar.css";
import Popup from 'reactjs-popup';

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

        {/*This code now is to rent*/}
        <Popup trigger={<button className='rnt'> Rent </button>}>
        
        <PopupInfo setCustomers={setResults} />
        
        </Popup>
        </div>
        
    );
};


function PopupInfo({setCustomers}) {

    const [rent, setRent] = useState({ customer_id: "", film_id: "" });
    
    const handleInputChange = (e) => {
        setRent({...rent, [e.target.name]: e.target.value});
    };

    const PatchRequest = (customer_id, film_id) => {
    fetch("/rent", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({
            customer_id: customer_id,
            film_id: film_id
        })
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Failed to update rental count.");
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        alert("Rental count updated successfully!");
    })
    .catch(function (error) {
        console.error("Error updating rental count:", error);
        alert("Failed to update rental count. Please try again.");
    });
};   

    const handleRent = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            console.log("Sending rental data:", rent); // Log the payload
            const response = await axios.post('/rent', rent, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log("Rental response:", response.data);
            if (response.data.success) {
                alert("Rental recorded successfully!");
                setRent({ customer_id: "", film_id: "" });

                //PatchRequest(rent.customer_id, rent.film_id);
    
                // Fetch updated customers after rental
                const customerResponse = await axios.get("/searchcustomers");
                setCustomers(customerResponse.data.customers);
            } else {
                alert("Failed to record rental.");
            }
        } catch (error) {
            console.error("Error renting movie:", error);
        }
    };
    


    return (
      <div>
       <form onSubmit={handleRent}>
            <div className='mb-3'>
                <label>Customer ID</label>
                <input type='text'
                name='customer_id'
                value={rent.customer_id} 
                onChange={handleInputChange}
                className='form-control' />
                </div>
            <div className='mb-3'>
                <label>Film ID</label>
                <input type='text' name='film_id'
                value={rent.film_id} 
                onChange={handleInputChange}
                className='form-control' />
                <button className='sbmt' type="submit">Confirm Rental</button>
                </div>
            </form>
            
      </div>
    );
  }