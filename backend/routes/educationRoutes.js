const express = require('express');
const authMiddleware = require('../middleware/auth');
const educationController = require('../controllers/educationController');

const router = express.Router();

router.use(authMiddleware);

router.get('/:alumni_id', educationController.getEducationByAlumni);
router.post('/', educationController.addEducation);
router.delete('/:edu_id', educationController.deleteEducation);

module.exports = router;
