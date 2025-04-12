const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// Get all snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (error) {
    console.error('Error fetching snippets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a snippet
router.post('/', async (req, res) => {
  try {
    const newSnippet = new Snippet(req.body);
    const savedSnippet = await newSnippet.save();
    res.status(201).json(savedSnippet);
  } catch (error) {
    console.error('Error saving snippet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a snippet 
router.delete('/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Error deleting snippet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;