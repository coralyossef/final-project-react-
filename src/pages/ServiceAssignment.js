import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServiceAssignment.css';

const ServiceAssignment = () => {
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [assignment, setAssignment] = useState({
        customerId: '',
        serviceId: ''
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });

        axios.get('http://127.0.0.1:5000/services')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the services!', error);
            });
    }, []);

    const handleChange = (e) => {
        setAssignment({ ...assignment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/assign-service', assignment)
            .then(response => {
                alert('Service assigned successfully');
            })
            .catch(error => {
                console.error('There was an error assigning the service!', error);
            });
    };

    return (
        <div className="service-assignment-container">
            <h1 className="service-assignment-title">Assign Service</h1>
            <form onSubmit={handleSubmit} className="service-assignment-form">
                <select name="customerId" onChange={handleChange} value={assignment.customerId} required>
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.first_name} {customer.last_name}
                        </option>
                    ))}
                </select>
                <select name="serviceId" onChange={handleChange} value={assignment.serviceId} required>
                    <option value="">Select Service</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Assign Service</button>
            </form>
        </div>
    );
};

export default ServiceAssignment;
