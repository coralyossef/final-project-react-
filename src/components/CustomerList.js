import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './ServiceList.css';
import './CustomerList.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredCustomers = customers
        .filter(customer => customer.customer_type.includes(filter))
        .filter(customer => 
            customer.first_name.toLowerCase().includes(search.toLowerCase()) ||
            customer.last_name.toLowerCase().includes(search.toLowerCase()) ||
            customer.user_name.toLowerCase().includes(search.toLowerCase()) ||
            customer.email.toLowerCase().includes(search.toLowerCase()) ||
            customer.phone.includes(search)
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.last_name.localeCompare(b.last_name);
            } else {
                return b.last_name.localeCompare(a.last_name);
            }
        });

    const handleDeleteCustomer = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            axios.delete(`http://127.0.0.1:5000/customers/${id}`, {
                auth: {
                    "username": user.user_name,
                }
            })
                .then(response => {
                    alert('Customer deleted successfully');
                    setCustomers(customers.filter(customer => customer.id !== id));
                })
                .catch(error => {
                    console.error('There was an error deleting the customer!', error);
                });
        }
    };

    return (
        <div className="customer-list-container">
            <div className="customer-list-header">
                <h1 className="customer-list-title">Customer List</h1>
                <Link to="/add-customer" className="button">Add Customer</Link>
            </div>
            <div className="customer-type-filter">
                <select onChange={handleFilterChange} value={filter} className="dropdownTerm">
                    <option value="">All</option>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
                <input 
                    type="text" 
                    placeholder="Search customers..." 
                    value={search} 
                    onChange={handleSearchChange}
                    className="searchTerm"
                />
                <button onClick={handleSortOrderChange} className='searchButton'>
                    Sort by Last Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
                </button>
            </div>
            <table className="customer-list-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Customer Type</th>
                        <th>User Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.user_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.customer_type}</td>
                            <td>{customer.user_type}</td>
                            <td>
                                <Link to={`/customers/edit/${customer.id}`} className="button">Edit</Link>
                                <button onClick={() => handleDeleteCustomer(customer.id)} className="button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
