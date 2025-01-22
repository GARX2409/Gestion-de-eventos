const express = require('express');
const Event = require('../models/event');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Get all events
router.get('/', authenticate, async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user.id });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create an event
router.post('/', authenticate, async (req, res) => {
    const { name, date, time, location, description } = req.body;
    try {
        const newEvent = new Event({ name, date, time, location, description, userId: req.user.id });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an event
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { name, date, time, location, description } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { name, date, time, location, description },
            { new: true }
        );
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an event
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
