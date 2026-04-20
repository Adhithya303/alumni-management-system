const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const getEvents = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM EVENT ORDER BY event_date DESC');
    return sendResponse(res, 200, true, rows, 'Events fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const addEvent = async (req, res, next) => {
  const { event_name, event_date, location } = req.body;

  try {
    const [result] = await pool.query('INSERT INTO EVENT (event_name, event_date, location) VALUES (?, ?, ?)', [
      event_name,
      event_date,
      location,
    ]);

    return sendResponse(res, 201, true, { event_id: result.insertId }, 'Event added successfully');
  } catch (error) {
    return next(error);
  }
};

const getEventParticipants = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT A.alumni_id, A.name, A.email, EP.role
       FROM EVENT_PARTICIPATION EP
       JOIN ALUMNI A ON EP.alumni_id = A.alumni_id
       WHERE EP.event_id = ?
       ORDER BY A.name ASC`,
      [id]
    );

    return sendResponse(res, 200, true, rows, 'Event participants fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const participateInEvent = async (req, res, next) => {
  const { id } = req.params;
  const { alumni_id, role } = req.body;

  try {
    await pool.query('INSERT INTO EVENT_PARTICIPATION (alumni_id, event_id, role) VALUES (?, ?, ?)', [
      alumni_id,
      id,
      role || 'Participant',
    ]);

    return sendResponse(res, 201, true, null, 'Alumni registered for event successfully');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return sendResponse(res, 400, false, null, 'Alumni already registered for this event');
    }
    return next(error);
  }
};

module.exports = { getEvents, addEvent, getEventParticipants, participateInEvent };
