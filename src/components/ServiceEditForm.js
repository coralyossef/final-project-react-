import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './ServiceEditForm.css';

const ServiceEditForm = () => {
    const { id } = useParams(); // Get the service ID from the URL params
    const navigate = useNavigate(); // Navigate hook from react-router-dom
    const { user } = useContext(AuthContext);

    const [service, setService] = useState({
        name: '',
        description: '',
        icon: '',
        price: 0,
        customer_type: 'private'
    });

    useEffect(() => {
        // Fetch the service data when component mounts
        axios.get(`http://127.0.0.1:5000/services/${id}`)
            .then(response => {
                setService(response.data);
            })
            .catch(error => {
                console.error('Error fetching service:', error);
            });
    }, [id]); // Dependency array to re-fetch when ID changes

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:5000/services/${id}`, service, {
            auth: {
                "username": user.user_name
            }
        })
            .then(response => {
                alert('Service updated successfully');
                navigate('/services'); // Redirect to services list after update
            })
            .catch(error => {
                console.error('Error updating service:', error);
                alert('Failed to update service');
            });
    };

    return (
        <div className="service-edit-form-container">
            <form onSubmit={handleSubmit} className="service-edit-form">
                <h2>Edit Service</h2>
                <input type="text" name="name" placeholder="Service Name" value={service.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={service.description} onChange={handleChange} className="textarea-field"></textarea>
                <input type="text" name="icon" placeholder="Icon URL" value={service.icon} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={service.price} onChange={handleChange} required />
                <select name="customer_type" value={service.customer_type} onChange={handleChange} required>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default ServiceEditForm;