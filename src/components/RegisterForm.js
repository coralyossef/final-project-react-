import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
    const [customer, setCustomer] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        customer_type: 'private',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/register', customer, {"Access-Control-Allow-Origin": "*"})
            .then(response => {
                setMessage('Customer registered successfully');
                navigate("/login")
            })
            .catch(error => {
                console.error('There was an error registering the customer!', error);
                setMessage('Error registering customer');
            });
    };

    return (
        <div className="register-form-container">
            <h1 className="register-form-title">Register</h1>
            {message && <div className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</div>}
            <form className="register-form" onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={customer.first_name} onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" value={customer.last_name} onChange={handleChange} />
                <input type="text" name="username" placeholder="Username" value={customer.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={customer.password} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} />
                <select name="customer_type" value={customer.customer_type} onChange={handleChange}>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
