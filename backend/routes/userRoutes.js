const express = require('express');
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(authMiddleware);

router.get('/:alumni_id/skill-count', userController.getSkillCountByAlumni);

module.exports = router;
