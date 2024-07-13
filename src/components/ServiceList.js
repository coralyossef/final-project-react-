import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../context/AuthContext';
import './ServiceList.css';
import './CustomerList.css';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [filter, setFilter] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/services')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the services!', error);
            });
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredServices = filter
        ? services.filter(service => service.customer_type === filter)
        : services;

    const handleDeleteService = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            axios.delete(`http://127.0.0.1:5000/services/${id}`, {
                auth: {
                    "username": user.user_name,
                }
            })
                .then(response => {
                    alert('Service deleted successfully');
                    setServices(services.filter(service => service.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting service:', error);
                    alert('Failed to delete service');
                });
        }
    };

    return (
        <div className="service-list-container">
            <div className="service-list-header">
                <h1 className="service-list-title">Service List</h1>
                <Link to="/add-service" className="button">Add Service</Link>
            </div>
            <div className="service-type-filter">
                <select onChange={handleFilterChange} value={filter} className="dropdownTerm">
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
                        <th>Price</th>
                        <th>Customer Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredServices.map(service => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>${service.price}</td>
                            <td>{service.customer_type}</td>
                            <td>
                                <Link to={`/services/edit/${service.id}`} className="button">Edit</Link>
                                <button onClick={() => handleDeleteService(service.id)} className='button'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;
