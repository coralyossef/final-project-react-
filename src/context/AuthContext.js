import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (username, password) => {
        return axios.post('http://127.0.0.1:5000/login', { "username": username, "password": password })
            .then(response => {
                const user = response.data.user;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));  // Store user in localStorage
                setLoading(false);
                return user;
            })
            .catch(error => {
                console.error('Login error:', error);
                throw error;
            });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser != null) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');  // Remove user from localStorage
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
