const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');
const { auth, requireAdmin } = require('../middleware/auth');

// POST /api/notes -> add new note (protected)
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  try {
    const note = new Note({ user: req.user.id, title, description });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// GET /api/notes -> get all notes of logged in user (protected)
router.get('/', auth, async (req, res) => {
  try {
    // admin can optionally fetch all notes with query ?all=true
    if (req.query.all === 'true' && req.user.role === 'admin') {
      const notes = await Note.find().populate('user', 'name email').sort({ createdAt: -1 });
      return res.json(notes);
    }
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// PUT /api/notes/:id -> edit note (protected)
router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.updatedAt = Date.now();
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// DELETE /api/notes/:id -> delete note (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await note.deleteOne({ _id: note._id });
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Admin-only: GET /api/notes/users -> list all users (optional admin route)
router.get('/admin/users', auth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

module.exports = router;
