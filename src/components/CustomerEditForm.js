import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CustomerEditForm.css';

const CustomerEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [customer, setCustomer] = useState({
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        phone: '',
        customer_type: 'private',
        user_type: 'customer'
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/customers/${id}`)
            .then(response => {
                setCustomer(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customer!', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:5000/customers/${id}`, customer, 
            {
                auth: {
                    "username": user.user_name
                }
            })
            .then(response => {
                alert('Customer updated successfully');
                navigate('/customers');
            })
            .catch(error => {
                console.error('There was an error updating the customer!', error);
            });
    };

    return (
        <div className="customer-edit-form-container">
            <form onSubmit={handleSubmit} className="customer-edit-form">
                <h2>Edit Customer</h2>
                <input type="text" name="first_name" placeholder="First Name" value={customer.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={customer.last_name} onChange={handleChange} required />
                <input type="text" name="user_name" placeholder="Username" value={customer.user_name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} />
                <select name="customer_type" value={customer.customer_type} onChange={handleChange} required>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
                <select name="user_type" onChange={handleChange} required>
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="operator">Operator</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default CustomerEditForm;
