const express = require('express');
const authMiddleware = require('../middleware/auth');
const alumniController = require('../controllers/alumniController');
const skillController = require('../controllers/skillController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', alumniController.getAllAlumni);
router.get('/:id', alumniController.getAlumniById);
router.post('/', alumniController.createAlumni);
router.put('/:id', alumniController.updateAlumni);
router.delete('/:id', alumniController.deleteAlumni);

router.get('/:id/skills', skillController.getAlumniSkills);
router.post('/:id/skills', skillController.assignSkill);
router.delete('/:id/skills/:sid', skillController.removeSkill);

module.exports = router;
