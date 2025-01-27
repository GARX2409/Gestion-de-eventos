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
            <Link to="/">Inicio</Link>
            <div>
                <Link to="/login">Inico de sesión</Link>
                <Link to="/register">Registrarse</Link>
                <Link to="/events">Eventos</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;