import axios from "axios";
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './customer.css';


function Update() {

    const {id} = useParams();
    const [values, setValues] = useState({
        id: id,
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        district: '',
        city: '',
        country: '',
        phone: ''
    })
    useEffect(() => {
        axios.get(`/updatecustomers/${id}`)
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
                phone: res.data.phone
            }))
        })
        .catch(error => console.log(error))
    }, [id])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/updatecustomers/${id}`, values, {
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
        <div>Update Data:</div>

            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="first_name">First Name:</label>
                            <input type='text'
                            name='first_name'
                            className="form-control" 
                            placeholder='Enter First Name'
                            value={values.first_name}
                            onChange={e => setValues({...values, first_name: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name:</label>
                            <input type='text' name='last_name' className="form-control" placeholder='Enter Last Name'
                            value={values.last_name} onChange={e => setValues({...values, last_name: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type='text' name='email' className="form-control" placeholder='Enter Email'
                            value={values.email} onChange={e => setValues({...values, email: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="address">Address:</label>
                            <input type='text' name='address' className="form-control" placeholder='Enter Address'
                            value={values.address} onChange={e => setValues({...values, address: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="district">District:</label>
                            <input type='text' name='district' className="form-control" placeholder='Enter District'
                            value={values.district} onChange={e => setValues({...values, district: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input type='text' name='city' className="form-control" placeholder='Enter City'
                            value={values.city} onChange={e => setValues({...values, city: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="country">Country:</label>
                            <input type='text' name='country' className="form-control" placeholder='Enter Country'
                            value={values.country} onChange={e => setValues({...values, country: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone:</label>
                            <input type='text' name='phone' className="form-control" placeholder='Enter Phone'
                            value={values.phone} onChange={e => setValues({...values, phone: e.target.value})}/>
                        </div>
                        <button className="updatebtn btn-info">Update</button>
                    </form>
                    <br/>
                </div>
            </div>
        </>
    )
}

export default Update