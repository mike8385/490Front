import axios from "axios";
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './info.css';
import Popup from "reactjs-popup";


function Info() {
    

    const {id} = useParams();
    const [results, setResults] = useState({});
    const [values, setValues] = useState({
        id: id,
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        district: '',
        city: '',
        country: '',
        phone: '',
        rented: '',
        returned: '',
        rental_history_list: '',
        rented_movies: ''

    })
    useEffect(() => {
        axios.get(`/info/${id}`)
        .then(res => {
            setValues(prevValues => ({//{...values, first_name: res.data.first_name,
                ...prevValues,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                address: res.data.address,
                district: res.data.district,
                city: res.data.city,
                country: res.data.country,
                phone: res.data.phone,
                rented: res.data.rented,
                returned: res.data.returned,
                rental_history: res.data.rental_history,
                currently_rented: res.data.currently_rented
                

            }))
        })
        .catch(error => console.log(error))
    }, [id])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/info/${id}`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            navigate('/customer')
            })
        .catch(error => console.log(error))

    }

    return(
        <>
        <Header/>
            
                <h2> Customer Info:</h2>
                <div className="info-container">

                    <form className='info-form' onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="first_name">First Name:</label>
                            <p>{values.first_name}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="last_name">Last Name:</label>
                            <p>{values.last_name}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">Email:</label>
                            <p>{values.email}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="address">Address:</label>
                            <p>{values.address}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="district">District:</label>
                            <p>{values.district}</p>
                        </div>
                        <div className="form-row">
                        <label htmlFor="city">City:</label>
                            <p>{values.city}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="country">Country:</label>
                                <p>{values.country}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="phone">Phone:</label>
                            <p>{values.phone}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="rented">Rented:</label>
                            <p>{values.rented}</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="returned">Returned:</label>
                            <p>{values.returned}</p>
                        </div>
                        <div className="form-row">
                        <label htmlFor="rental_history">Rental History:</label>
                        <ul>
                            {values.rental_history && values.rental_history.length > 0 ? (
                                values.rental_history.map((rental, index) => (
                                    <li key={index}>
                                        <div><strong>Film ID:</strong> {rental.film_id}</div>
                                        <div><strong>Rented On:</strong> {rental.rental_date}</div>
                                        <div><strong>Returned On:</strong> {rental.return_date || "Not Returned"}</div>
                                    </li>
                                ))
                            ) : (
                                <li>No rental history available.</li>
                            )}
                        </ul>
                    </div>

                    <div className="form-row">
                        <label htmlFor="currently_rented">Currently Rented Movies:</label>
                        <ul>
                            {values.currently_rented && values.currently_rented.length > 0 ? (
                                values.currently_rented.map((rental, index) => (
                                    <li key={index}>
                                        <div><strong>Rental ID:</strong> {rental.rental_id}</div>
                                        <div><strong>Film ID:</strong> {rental.film_id}</div>
                                        <div><strong>Rented On:</strong> {rental.rental_date}</div>
                                    </li>
                                ))
                            ) : (
                                <li>No movies currently rented.</li>
                            )}
                        </ul>
                    </div>

                    </form>
                    <Popup trigger={<button className='returnbtn'> Return Films</button>}
                    position="top center"> 
                        <PopupInfo setReturn={setResults} customerId={values.id}/>
                    </Popup>
                    <button className="updatebtn btn-info" onClick={() => navigate('/customer')}>
                        Back
                    </button>
                    <br/>

                </div>
        </>
    )
}

function PopupInfo({setReturn, customerId}) {

    const [rent, setRent] = useState({ customer_id: customerId, film_id: "" });
    

    useEffect(() => {
        setRent(prev => ({...prev, customer_id: customerId}));
    }, [customerId])

    const handleInputChange = (e) => {
        setRent({...rent, [e.target.name]: e.target.value});
    };



    const PatchRequest = (customer_id, film_id) => {
    fetch("/returnfilm", {
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
            const response = await axios.patch('/returnfilm', rent, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log("Rental response:", response.data);
            if (response.data.success) {
                alert("Rental recorded successfully!");
                setRent({ customer_id: customerId, film_id: "" });

                //PatchRequest(rent.customer_id, rent.film_id);
    
                // Fetch updated customers after rental
                const customerResponse = await axios.get(`/info/${customerId}`);
                setReturn(customerResponse.data);
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
                    <label>Customer ID: {rent.customer_id} </label>
                </div> 
            <div className='mb-3'>
                <label>Film ID</label>
                <input type='text' name='film_id'
                value={rent.film_id} 
                onChange={handleInputChange}
                className='form-control' />
                <button className='sbmt' type="submit">Confirm Return</button>
                </div>
            </form>
            
      </div>
    );
  }

export default Info