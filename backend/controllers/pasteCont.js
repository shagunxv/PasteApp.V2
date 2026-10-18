
const Paste = require('../models/Paste');

// @desc    Get all pastes of logged-in user
// @route   GET /api/pastes
const getPastes = async (req, res) => {
  try {
    const pastes = await Paste.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(pastes);
  } catch (error) {
    console.error('Get pastes error:', error);
    res.status(500).json({ message: 'Failed to fetch pastes' });
  }
};

// @desc    Create a paste
// @route   POST /api/pastes
const createPaste = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      typeof title !== 'string' ||
      !title.trim() ||
      typeof content !== 'string' ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: 'Title and content are required',
      });
    }

    const paste = await Paste.create({
      title: title.trim(),
      content,
      user: req.user.id,
    });

    res.status(201).json(paste);
  } catch (error) {
    console.error('Create paste error:', error);
    res.status(500).json({ message: 'Failed to create paste' });
  }
};

// @desc    Update a paste belonging to logged-in user
// @route   PUT /api/pastes/:id
const updatePaste = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      typeof title !== 'string' ||
      !title.trim() ||
      typeof content !== 'string' ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: 'Title and content are required',
      });
    }

    const paste = await Paste.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!paste) {
      return res.status(404).json({ message: 'Paste not found' });
    }

    paste.title = title.trim();
    paste.content = content;

    await paste.save();

    res.status(200).json(paste);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid paste ID' });
    }

    console.error('Update paste error:', error);
    res.status(500).json({ message: 'Failed to update paste' });
  }
};

// @desc    Get one paste belonging to logged-in user
// @route   GET /api/pastes/:id
const getPasteById = async (req, res) => {
  try {
    const paste = await Paste.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!paste) {
      return res.status(404).json({ message: 'Paste not found' });
    }

    res.status(200).json(paste);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid paste ID' });
    }

    console.error('Get paste error:', error);
    res.status(500).json({ message: 'Failed to fetch paste' });
  }
};

// @desc    Delete a paste belonging to logged-in user
// @route   DELETE /api/pastes/:id
const deletePaste = async (req, res) => {
  try {
    const paste = await Paste.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!paste) {
      return res.status(404).json({ message: 'Paste not found' });
    }

    res.status(200).json({ message: 'Paste deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid paste ID' });
    }

    console.error('Delete paste error:', error);
    res.status(500).json({ message: 'Failed to delete paste' });
  }
};

module.exports = {
  getPastes,
  createPaste,
  updatePaste,
  getPasteById,
  deletePaste,
};
