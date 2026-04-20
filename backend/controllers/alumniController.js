const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const getAllAlumni = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni_details ORDER BY alumni_id DESC');
    return sendResponse(res, 200, true, rows, 'Alumni fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const getAlumniById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [[alumni]] = await pool.query('SELECT * FROM ALUMNI WHERE alumni_id = ?', [id]);
    if (!alumni) {
      return sendResponse(res, 404, false, null, 'Alumni not found');
    }

    const [education] = await pool.query('SELECT * FROM EDUCATION WHERE alumni_id = ?', [id]);
    const [jobs] = await pool.query(
      `SELECT J.*, C.company_name, C.industry, C.location
       FROM JOB J
       LEFT JOIN COMPANY C ON J.company_id = C.company_id
       WHERE J.alumni_id = ?`,
      [id]
    );
    const [skills] = await pool.query(
      `SELECT S.skill_id, S.skill_name
       FROM ALUMNI_SKILL ASX
       JOIN SKILL S ON ASX.skill_id = S.skill_id
       WHERE ASX.alumni_id = ?`,
      [id]
    );
    const [events] = await pool.query(
      `SELECT E.event_id, E.event_name, E.event_date, E.location, EP.role
       FROM EVENT_PARTICIPATION EP
       JOIN EVENT E ON EP.event_id = E.event_id
       WHERE EP.alumni_id = ?`,
      [id]
    );

    return sendResponse(
      res,
      200,
      true,
      {
        ...alumni,
        education,
        jobs,
        skills,
        events,
      },
      'Alumni profile fetched successfully'
    );
  } catch (error) {
    return next(error);
  }
};

const createAlumni = async (req, res, next) => {
  const { name, email, phone, dob, gender } = req.body;

  if (!name || !email) {
    return sendResponse(res, 400, false, null, 'Name and email are required');
  }

  try {
    await pool.query('CALL add_alumni(?, ?, ?, ?, ?)', [name, email, phone || null, dob || null, gender || null]);
    return sendResponse(res, 201, true, null, 'Alumni added successfully');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY' || error.sqlState === '45000') {
      return sendResponse(res, 400, false, null, error.sqlMessage || error.message);
    }
    return next(error);
  }
};

const updateAlumni = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, dob, gender } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE ALUMNI
       SET name = ?, email = ?, phone = ?, dob = ?, gender = ?
       WHERE alumni_id = ?`,
      [name, email, phone || null, dob || null, gender || null, id]
    );

    if (!result.affectedRows) {
      return sendResponse(res, 404, false, null, 'Alumni not found');
    }

    return sendResponse(res, 200, true, null, 'Alumni updated successfully');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY' || error.sqlState === '45000') {
      return sendResponse(res, 400, false, null, error.sqlMessage || error.message);
    }
    return next(error);
  }
};

const deleteAlumni = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM ALUMNI WHERE alumni_id = ?', [id]);

    if (!result.affectedRows) {
      return sendResponse(res, 404, false, null, 'Alumni not found');
    }

    return sendResponse(res, 200, true, null, 'Alumni deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllAlumni,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni,
};
