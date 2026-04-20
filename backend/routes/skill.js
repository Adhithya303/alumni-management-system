const express = require('express');
const { getAllSkills, getAlumniSkills, assignSkill, removeSkill } = require('../controllers/skillController');

const router = express.Router();

router.get('/skills', getAllSkills);
router.get('/alumni/:id/skills', getAlumniSkills);
router.post('/alumni/:id/skills', assignSkill);
router.delete('/alumni/:id/skills/:sid', removeSkill);

module.exports = router;
