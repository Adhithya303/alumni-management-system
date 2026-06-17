const express = require('express');
const { getSkillCountByAlumni } = require('../controllers/userController');

const router = express.Router();

router.get('/:alumni_id/skill-count', getSkillCountByAlumni);

module.exports = router;
