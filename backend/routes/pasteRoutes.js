
const express = require('express');
const router = express.Router();

const {
  getPastes,
  createPaste,
  updatePaste,
  getPasteById,
  deletePaste,
} = require('../controllers/pasteCont');

const { protect } = require('../middleware/appMW');

// All routes require a valid JWT
router.route('/')
  .get(protect, getPastes)
  .post(protect, createPaste);

router.route('/:id')
  .get(protect, getPasteById)
  .put(protect, updatePaste)
  .delete(protect, deletePaste);

module.exports = router;
