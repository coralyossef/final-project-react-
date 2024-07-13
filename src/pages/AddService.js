import React, { useState } from 'react';
import axios from 'axios';
import './AddService.css';

const AddService = () => {
    const [service, setService] = useState({
        name: '',
        description: '',
        icon: '',
        price: 0,
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
        <div className="service-list-container">
            <h1 className="service-list-title">Service List</h1>
            <div className="service-type-filter">
                <select onChange={handleFilterChange} value={filter}>
                    <option value="">All</option>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="institutional">Institutional</option>
                </select>
            </div>
            <table className="service-list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Icon</th>
                        <th>Price</th>
                        <th>Customer Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredServices.map(service => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td><img src={service.icon} alt="Service Icon" className="service-icon" /></td>
                            <td>${service.price}</td>
                            <td>{service.customer_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddService;
