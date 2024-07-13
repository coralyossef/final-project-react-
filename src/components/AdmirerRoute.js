    // src/components/AdmirerRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdmirerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user && user.role === 'Operator' ? children : <Navigate to="/not-authorized" />;
};

export default AdmirerRoute;
