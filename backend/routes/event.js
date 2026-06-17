const express = require('express');
const {
  getEvents,
  addEvent,
  getEventParticipants,
  participateInEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getEvents);
router.post('/', addEvent);
router.get('/:id/participants', getEventParticipants);
router.post('/:id/participate', participateInEvent);

module.exports = router;
