import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch services
        axios.get('http://127.0.0.1:5000/services')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the services!', error);
            });

        // Fetch customers
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []);

    // Function to handle card click
    const handleServiceCardClick = (id) => {
        console.log(`Service card clicked with id: ${id}`);
        // Implement navigation or other action here
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome to Customer Management</h1>
                <p>Manage your customers and services effectively</p>
            </header>
            <section className="dashboard-content">
                <div className="dashboard-section">
                    <h2>Customers</h2>
                    <div className="dashboard-list">
                        {customers.map(customer => (
                            <div key={customer.id} className="dashboard-card">
                                <h3>{customer.first_name} {customer.last_name}</h3>
                                <p>Type: {customer.customer_type}</p>
                                <p>Email: {customer.email}</p>
                                <p>Phone: {customer.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dashboard-section">
                    <h2>Services</h2>
                    <div className="dashboard-list">
                        {services.map(service => (
                            <div key={service.id} className="dashboard-card">
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <p>Price: ${service.price}</p>
                                <p>Type: {service.customer_type}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;