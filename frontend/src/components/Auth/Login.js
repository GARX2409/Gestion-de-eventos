import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import Swal from 'sweetalert2';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', formData);
            localStorage.setItem('token', data.token);
            Swal.fire('¡Bienvenido!', 'Has iniciado sesión correctamente', 'success');
            navigate('/events');
        } catch (err) {
            Swal.fire('Error', 'Credenciales inválidas', 'error');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="form-control my-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="form-control my-2"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button className="btn btn-primary">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
