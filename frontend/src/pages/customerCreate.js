import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';
import './customer.css';


function CustomerCreate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        district: '',
        city: '',
        country: '',
        phone: ''
    })

    const handleInput =(e) => {
        e.persist();
        setCustomer({...customer, [e.target.name]: e.target.value});
    }

    const saveCustomer =(e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            address: customer.address,
            district: customer.district,
            city: customer.city,
            country: customer.country,
            phone: customer.phone
        }

        axios.post(`http://127.0.0.1:5000/addcustomers`, data)
        .then(res => {

            navigate('/Customer');
            alert(res.data.message);
        })
        .catch(error => {
            console.error("Error adding customer:", error);
            alert("Failed to add customer");
        })
        .finally(() => setLoading(false));


    }




    return (
        <>
        <Header/>
        <div>
            <div className='card-body'>
        <form onSubmit={saveCustomer}>
            <div className='mb-3'>
                <label>First Name</label>
                <input type='text' name='first_name' 
                value={customer.first_name} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Last Name</label>
                <input type='text' name='last_name'
                value={customer.last_name} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Email</label>
                <input type='text' name='email'
                value={customer.email} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Address</label>
                <input type='text' name='address'
                value={customer.address} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <label>District</label>
                <input type='text' name='district'
                value={customer.district} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <label>City</label>
                <input type='text' name='city'
                value={customer.city} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Country</label>
                <input type='text' name='country'
                value={customer.country} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <label>Phone</label>
                <input type='text' name='phone'
                value={customer.phone} 
                onChange={handleInput}
                className='form-control' />
            </div>
            <div className='mb-3'>
                <button type ='submit' className='btn btn-primary save-customer-btn'> Save Customer</button>
            </div>
        </form>
    </div>
        </div>

</>

    )
}

export default CustomerCreate;