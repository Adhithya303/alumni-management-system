const express = require('express');
const authMiddleware = require('../middleware/auth');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', eventController.getEvents);
router.post('/', eventController.addEvent);
router.get('/:id/participants', eventController.getEventParticipants);
router.post('/:id/participate', eventController.participateInEvent);

module.exports = router;
