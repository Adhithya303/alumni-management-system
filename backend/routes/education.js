const express = require('express');
const { getEducationByAlumni, addEducation, deleteEducation } = require('../controllers/educationController');

const router = express.Router();

router.get('/:alumni_id', getEducationByAlumni);
router.post('/', addEducation);
router.delete('/:edu_id', deleteEducation);

module.exports = router;
