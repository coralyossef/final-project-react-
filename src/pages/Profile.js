import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get(`http://127.0.0.1:5000/customers/${user.id}`)
                .then(response => {
                    setProfile(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the profile!', error);
                });
        }
    }, [user]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile</h1>
            <div className="profile-details">
                <div className="profile-item">
                    <label>First Name:</label>
                    <span>{profile.first_name}</span>
                </div>
                <div className="profile-item">
                    <label>Last Name:</label>
                    <span>{profile.last_name}</span>
                </div>
                <div className="profile-item">
                    <label>Email:</label>
                    <span>{profile.email}</span>
                </div>
                <div className="profile-item">
                    <label>Phone:</label>
                    <span>{profile.phone}</span>
                </div>
                <div className="profile-item">
                    <label>Customer Type:</label>
                    <span>{profile.customer_type}</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;
