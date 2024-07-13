import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css'; // Import the CSS file

function ProtectedItem({ user, type, name, linkPath }) {
    if (!user || !type.includes(user.user_type))
        return (<br />);

    return (
        <li className="navbar-item"><Link to={linkPath} className="navbar-link">{name}</Link></li>
    )
}

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
                <li className="navbar-item"><Link to="/profile" className="navbar-link">Profile</Link></li>
                
                <ProtectedItem user={user} type={["operator"]} name="Customers" linkPath="/customers" />
                <ProtectedItem user={user} type={["operator"]} name="Services" linkPath="/services" />

                {user ? (
                    <li className="navbar-item"><button className="navbar-button" onClick={logout}>Logout</button></li>
                ) : (
                    <div className="action_box">
                        <li className="navbar-item"><Link to="/login" className="navbar-link">Login</Link></li>
                        <li className="navbar-item"><Link to="/register" className="navbar-link">Register</Link></li>
                    </div>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
