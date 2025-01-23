import React, { useState } from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';

const Events = () => {
    const [events, setEvents] = useState([]);

    const handleEventCreated = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    return (
        <div className="container">
            <h1>Event Manager</h1>
            <EventForm onEventCreated={handleEventCreated} />
            <EventList events={events} />
        </div>
    );
};

export default Events;