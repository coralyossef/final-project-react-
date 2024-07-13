import React, { useState } from 'react';
import axios from 'axios';
import './RegisterCustomer.css';

const RegisterCustomer = () => {
    const [customer, setCustomer] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        customer_type: 'private',
        user_type: 'customer'  // Default to customer, can be changed to manager or operator if needed
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/register', {headers: {"Access-Control-Allow-Origin": "*"}}, customer)
            .then(response => {
                alert('Customer registered successfully');
            })
            .catch(error => {
                console.error('There was an error registering the customer!', error);
            });
    };

    return (
        <div className="register-customer-container">
            <h2>Register Customer</h2>
            <form onSubmit={handleSubmit} className="register-customer-form">
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
                <input type="text" name="user_name" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                <select name="customer_type" onChange={handleChange} required>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
                <select name="user_type" onChange={handleChange} required>
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="operator">Operator</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterCustomer;