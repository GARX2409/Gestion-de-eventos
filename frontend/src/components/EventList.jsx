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
                text: 'Failed to fetch events!',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this event!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/events/${id}`);
                setEvents(events.filter((event) => event._id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Event deleted!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (err) {
                console.error('Failed to delete event', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to delete event!',
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
                title: 'Event updated!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            console.error('Failed to update event', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update event!',
            });
        }
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <h2>Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                        <p>{event.location}</p>
                        <button onClick={() => handleEdit(event)}>Edit</button>
                        <button onClick={() => handleDelete(event._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Modal de edición */}
            {editingEvent && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Event</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(editingEvent);
                            }}
                        >
                            <div>
                                <label>Title:</label>
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
                                <label>Description:</label>
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
                                <label>Date:</label>
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
                                <label>Location:</label>
                                <input
                                    type="text"
                                    value={editingEvent.location}
                                    onChange={(e) =>
                                        setEditingEvent({ ...editingEvent, location: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditingEvent(null)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventList;