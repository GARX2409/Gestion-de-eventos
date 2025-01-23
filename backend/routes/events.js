const express = require('express');
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({ user: req.userId });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        const event = new Event({ title, description, date, location, user: req.userId });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

module.exports = router;