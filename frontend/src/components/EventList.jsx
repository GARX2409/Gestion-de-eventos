import React, { useEffect, useState } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null); // Estado para el evento en edición

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(res.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch events', err);
            setError('Failed to fetch events. Please try again later.');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudieron recuperar los eventos!',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Estas seguro?',
            text: 'No podrás recuperar este evento.!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/events/${id}`);
                setEvents(events.filter((event) => event._id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Evento eliminado!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (err) {
                console.error('Failed to delete event', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se pudo eliminar el evento!',
                });
            }
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event); // Establece el evento en edición
    };

    const handleUpdate = async (updatedEvent) => {
        try {
            const res = await api.put(`/events/${updatedEvent._id}`, updatedEvent);
            setEvents(events.map((event) => (event._id === updatedEvent._id ? res.data : event)));
            setEditingEvent(null); // Cierra el modal de edición
            Swal.fire({
                icon: 'success',
                title: 'Evento actualizado!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            console.error('Failed to update event', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo actualizar el evento!',
            });
        }
    };

    if (loading) {
        return <div>Cargando eventos ...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <h2>Eventos</h2>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                        <p>{event.location}</p>
                        <button onClick={() => handleEdit(event)}>Editar</button>
                        <button onClick={() => handleDelete(event._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {/* Modal de edición */}
            {editingEvent && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar evento</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(editingEvent);
                            }}
                        >
                            <div>
                                <label>Titulo:</label>
                                <input
                                    type="text"
                                    value={editingEvent.title}
                                    onChange={(e) =>
                                        setEditingEvent({ ...editingEvent, title: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Descripcion:</label>
                                <input
                                    type="text"
                                    value={editingEvent.description}
                                    onChange={(e) =>
                                        setEditingEvent({ ...editingEvent, description: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Fecha:</label>
                                <input
                                    type="date"
                                    value={new Date(editingEvent.date).toISOString().split('T')[0]}
                                    onChange={(e) =>
                                        setEditingEvent({ ...editingEvent, date: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Ubicacion:</label>
                                <input
                                    type="text"
                                    value={editingEvent.location}
                                    onChange={(e) =>
                                        setEditingEvent({ ...editingEvent, location: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <button type="submit">Guardar cambios</button>
                            <button type="button" onClick={() => setEditingEvent(null)}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventList;