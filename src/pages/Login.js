import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = useHistory();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/login', credentials)
            .then(response => {
                console.log(response)
                if (response.data.message === 'Login successful') {
                    localStorage.setItem('user', JSON.stringify(response.data.user));  // Store user in localStorage
                    history.push('/');
                } else {
                    alert('Login failed');
                }
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
            });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
