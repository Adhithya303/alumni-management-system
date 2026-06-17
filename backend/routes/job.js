const express = require('express');
const { getJobsByAlumni, addJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/:alumni_id', getJobsByAlumni);
router.post('/', addJob);
router.delete('/:job_id', deleteJob);

module.exports = router;
