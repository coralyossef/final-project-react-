import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customers.css';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [filter, setFilter] = useState('');

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

    const filteredCustomers = filter
        ? customers.filter(customer => customer.customer_type === filter)
        : customers;

    return (
        <div className="customers-container">
            <h1 className="customers-title">Customers</h1>
            <div className="customer-type-filter">
                <select onChange={handleFilterChange} value={filter}>
                    <option value="">All</option>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
            </div>
            <table className="customers-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Customer Type</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
