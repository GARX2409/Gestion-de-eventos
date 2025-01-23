const express = require('express');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const event = new Event({ title, description, date, location, user: req.userId });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find({ user: req.userId });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const event = await Event.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title, description, date, location },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json({ msg: 'Event removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const { date, location } = req.query;
        const filter = { user: req.userId };
        if (date) {
            filter.date = new Date(date);
        }
        if (location) {
            filter.location = location;
        }
        const events = await Event.find(filter);
        res.json(events);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

const express = require('express');
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const router = express.Router();

// Todas las rutas de eventos están protegidas
router.use(auth);

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({ user: req.userId });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Otras rutas (POST, PUT, DELETE)...

module.exports = router;