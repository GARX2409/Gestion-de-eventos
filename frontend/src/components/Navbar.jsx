import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token
        navigate('/login'); // Redirige al usuario a la página de login
    };

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/events">Events</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;