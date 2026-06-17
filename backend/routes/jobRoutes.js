const express = require('express');
const authMiddleware = require('../middleware/auth');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.use(authMiddleware);

router.get('/:alumni_id', jobController.getJobsByAlumni);
router.post('/', jobController.addJob);
router.delete('/:job_id', jobController.deleteJob);

module.exports = router;
