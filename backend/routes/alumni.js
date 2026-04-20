const express = require('express');
const {
  getAllAlumni,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni,
} = require('../controllers/alumniController');

const router = express.Router();

router.get('/', getAllAlumni);
router.get('/:id', getAlumniById);
router.post('/', createAlumni);
router.put('/:id', updateAlumni);
router.delete('/:id', deleteAlumni);

module.exports = router;
