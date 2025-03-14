import Header from '../components/Header'
import React from "react";
import { useEffect, useState } from 'react';
import PaginationOutlined from '../components/pagination';
import TablePagination from '@mui/material/TablePagination';
import './customer.css';
import {FaTrash, FaEdit, FaInfo} from "react-icons/fa";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link, useNavigate } from 'react-router-dom'
import { SearchBar } from '../components/searches/searchbar'; // Import the SearchBar component
import { SearchResultsList } from "../components/searches/SearchResultsList";





export default function Customer () {


        const [customers, setCustomers] = useState([]);
        const [newCustomer, setNewCustomer] = useState({ first_name: "", last_name: "" });
        const [filteredCustomers, setFilteredCustomers] = useState([]);
        const [searchTerm, setSearchTerm] = useState(""); // Search state


        const [page, setPage] = useState(0);
        const [totalPages, setTotalPages] = useState(1);
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const navigate = useNavigate();



        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        }

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };


    
        useEffect(() => {
          fetch("/searchcustomers")
          .then(response => response.json().then(data => {
              setCustomers(data.customers);
            })
          );
        }, []);

        // Handle search input change
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = customers.filter((customer) =>
            customer.first_name.toLowerCase().includes(value) ||
            customer.last_name.toLowerCase().includes(value) ||
            customer.customer_id.toString().includes(value)
        );
        setFilteredCustomers(filtered);
    };

    


        const handleAddCustomer = async (e) => {
            e.preventDefault();

            //const submitter = document.querySelector("button[value=save]");
        const formData = new FormData(e.target);
        const customerData = Object.fromEntries(formData.entries());


        const response = await fetch("/addcustomers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customerData),

            });

            const data = await response.json();
            if (data.success) {
                    setCustomers([...customers, data.customer]);
                    setNewCustomer({ first_name: "", last_name: "" });
            }
        };


        


        // const FunRemove =((id)=>{
        //     fetch("/Customers/"+id,
        //         {method: "DELETE"}).then(() => {

        //         }).catch((err)=>{
        //             console.log(err.message)
        //         })
        // })


    return (
        <>

            <Header />
            <h2> Customer Page</h2>

                        {/* Search Bar */}
                <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            

<div className="table-container">
    <table className="table table-sm">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col"># Rent</th>
                <th scope='col'>Remove</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Info</th>
            </tr>
        </thead>
        <tbody>
            {filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                <tr key={customer.customer_id}>
                    <th scope="row">{customer.customer_id}</th>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.count}</td>
                    <td>
                        <Popup trigger={
                        <button className='trashbtn'>
                        <FaTrash id="trash-icon"/>
                    
                    </button>} >        
                    <button onClick={(e) => {
                        //const url = baseUrl + '/customers/'
                        fetch(`/deletecustomers/${customer.customer_id}`, {method: 'DELETE'}).then((response) =>{
                            if(!response.ok){
                                throw new Error("Something went wrong!")
                            }
                            setCustomers(customers.filter(c => c.customer_id !== customer.customer_id));

                            
                           //assume things went well
                        })
                        .catch((e) => {} )

                    }}
                        className='trshconf'>Confirm?</button>
                    </Popup>

                    </td>

                    <td>
                        <Link className='text-decoration-none btn btn-sm btn-success'
                        to={`/update/${customer.customer_id}`}>
                            <FaEdit id="edit-icon"/>
                        </Link>

                    </td>
                    <td>
                    <Link className='text-decoration-none btn btn-sm btn-success'
                        to={`/info/${customer.customer_id}`}>
                            <FaInfo id="info-icon"/>
                        </Link>
                    </td>

                </tr>
            ))}
        </tbody>
    </table>
</div>
<div className="pagination-container">
    <div className="pagination-controls">
        <TablePagination
            component="div"
            count={customers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
                backgroundColor: "palevioletred",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel": {
                    marginTop: "1em",
                    marginBottom: "1em",
                    color: "black",
                },
                "& .MuiTablePagination-select, & .MuiTablePagination-actions button": {
                    color: "black",
                },
            }}
        />
    </div>

    <Link to="/customer/create" className='new-customer-btn'>Add Customer</Link>



    
</div>




        </>
    )

    function PopupInfo({info}) {
        return (
          <div>
          Hello
          </div>
        );
      }


}