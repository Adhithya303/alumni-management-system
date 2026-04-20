const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const getJobsByAlumni = async (req, res, next) => {
  const { alumni_id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT J.*, C.company_name, C.industry, C.location
       FROM JOB J
       LEFT JOIN COMPANY C ON J.company_id = C.company_id
       WHERE J.alumni_id = ?
       ORDER BY J.start_date DESC`,
      [alumni_id]
    );

    return sendResponse(res, 200, true, rows, 'Jobs fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const addJob = async (req, res, next) => {
  const { alumni_id, company_id, job_title, start_date, end_date } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO JOB (alumni_id, company_id, job_title, start_date, end_date)
       VALUES (?, ?, ?, ?, ?)`,
      [alumni_id, company_id, job_title, start_date || null, end_date || null]
    );

    return sendResponse(res, 201, true, { job_id: result.insertId }, 'Job added successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const { job_id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM JOB WHERE job_id = ?', [job_id]);

    if (!result.affectedRows) {
      return sendResponse(res, 404, false, null, 'Job not found');
    }

    return sendResponse(res, 200, true, null, 'Job deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = { getJobsByAlumni, addJob, deleteJob };
