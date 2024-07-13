import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
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
        axios.post('http://127.0.0.1:5000/register', customer)
            .then(response => {
                setMessage('Customer registered successfully');

                // Send email using EmailJS
                const templateParams = {
                    username: customer.username,
                    password: customer.password,
                    email: customer.email,
                    login_link: 'http://127.0.0.1:3000/login',
                    first_name: customer.first_name,
                    last_name: customer.last_name,
                    phone: customer.phone,
                    customer_type: customer.customer_type,
                };

                emailjs.send('service_ylpazl9', 'template_r36yshm', templateParams, 'Iw8ymLXQLACOux_4K')
                    .then((result) => {
                        console.log('Email sent successfully:', result.text);
                    }, (error) => {
                        console.error('There was an error sending the email:', error.text);
                    });

                setTimeout(() => {
                    navigate("/login");
                }, 2000); // Redirect to login after 2 seconds
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
                <input type="text" name="first_name" placeholder="First Name" value={customer.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={customer.last_name} onChange={handleChange} required />
                <input type="text" name="username" placeholder="Username" value={customer.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={customer.password} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} required />
                <select name="customer_type" value={customer.customer_type} onChange={handleChange} required>
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
