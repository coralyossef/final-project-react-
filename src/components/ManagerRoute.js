// src/components/ManagerRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ManagerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user && (user.user_type === 'manager' || user.user_type === "operator") ? children : <Navigate to="/" />;
};

export default ManagerRoute;
