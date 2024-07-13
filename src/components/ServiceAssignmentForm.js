import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServiceAssignmentForm.css';

const ServiceAssignmentForm = () => {
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [assignment, setAssignment] = useState({
        customerId: '',
        serviceId: ''
    });
    const [message, setMessage] = useState('');

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
        axios.post('http://127.0.0.1:8000/assign-service', assignment)
            .then(response => {
                setMessage('Service assigned successfully');
            })
            .catch(error => {
                console.error('There was an error assigning the service!', error);
                setMessage('Error assigning service');
            });
    };

    return (
        <div className="service-assignment-container">
            <h1 className="service-assignment-title">Assign Service</h1>
            {message && <div className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</div>}
            <form className="service-assignment-form" onSubmit={handleSubmit}>
                <select name="customerId" value={assignment.customerId} onChange={handleChange}>
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.first_name} {customer.last_name}
                        </option>
                    ))}
                </select>
                <select name="serviceId" value={assignment.serviceId} onChange={handleChange}>
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

export default ServiceAssignmentForm;
