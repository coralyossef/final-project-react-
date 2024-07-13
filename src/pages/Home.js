import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Home.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

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

    useEffect(() => {
        if (user) {
            const filtered = services.filter(service => service.customer_type === user.customer_type);
            setFilteredServices(filtered);
        }
    }, [services, user]);

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Customer Management</h1>
                <p>Manage your customers and services effectively</p>
            </header>
            <section className="home-content">
                {user && (user.user_type === 'manager' || user.user_type === 'operator') && (
                    <div className="home-section">
                        <h2>Customers</h2>
                        <ul className="home-list">
                            {customers.map(customer => (
                                <li key={customer.id}>
                                    <div className="home-card" onClick={() => handleCardClick(`/customers/${customer.id}`)}>
                                        <h3>{customer.first_name} {customer.last_name}</h3>
                                        <p>Type: {customer.customer_type}</p>
                                        <p>Email: {customer.email}</p>
                                        <p>Phone: {customer.phone}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="home-section">
                    <h2>Services</h2>
                    <ul className="home-list">
                        {filteredServices.map(service => (
                            <li key={service.id}>
                                <div className="home-card">
                                    <h3>{service.name}</h3>
                                    <p>{service.description}</p>
                                    <p>Price: ${service.price}</p>
                                    <p>Type: {service.customer_type}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Home;
