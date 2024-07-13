import React, { useState } from 'react';
import axios from 'axios';
import './ServiceForm.css';

const ServiceForm = () => {
    const [service, setService] = useState({
        name: '',
        description: '',
        icon: '',
        price: '',
        customer_type: 'private'
    });

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/services', service)
            .then(response => {
                alert('Service added successfully');
            })
            .catch(error => {
                console.error('There was an error adding the service!', error);
            });
    };

    return (
        <div className="service-form-container">
            <form className="service-form" onSubmit={handleSubmit}>
                <h2 className="service-form-title">Add Service</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Service Name"
                    value={service.name}
                    onChange={handleChange}
                    required
                    className="service-input"
                />
                <textarea
                    name="description"
                    placeholder="Service Description"
                    value={service.description}
                    onChange={handleChange}
                    className="service-textarea"
                />
                <input
                    type="text"
                    name="icon"
                    placeholder="Icon URL"
                    value={service.icon}
                    onChange={handleChange}
                    className="service-input"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={service.price}
                    onChange={handleChange}
                    required
                    className="service-input"
                />
                <select
                    name="customer_type"
                    value={service.customer_type}
                    onChange={handleChange}
                    className="service-select"
                >
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
                <button type="submit" className="service-button">Add Service</button>
            </form>
        </div>
    );
};

export default ServiceForm;
