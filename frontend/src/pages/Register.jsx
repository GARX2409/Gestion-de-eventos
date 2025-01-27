import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password });
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso!',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/login');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registro fallido!',
            });
        }
    };

    return (
        <div className="container">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;