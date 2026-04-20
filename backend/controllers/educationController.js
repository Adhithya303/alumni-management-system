const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const getEducationByAlumni = async (req, res, next) => {
  const { alumni_id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM EDUCATION WHERE alumni_id = ? ORDER BY graduation_year DESC', [alumni_id]);
    return sendResponse(res, 200, true, rows, 'Education records fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const addEducation = async (req, res, next) => {
  const { alumni_id, degree, department, college_name, graduation_year } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO EDUCATION (alumni_id, degree, department, college_name, graduation_year)
       VALUES (?, ?, ?, ?, ?)`,
      [alumni_id, degree, department, college_name, graduation_year]
    );

    return sendResponse(res, 201, true, { edu_id: result.insertId }, 'Education record added successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  const { edu_id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM EDUCATION WHERE edu_id = ?', [edu_id]);
    if (!result.affectedRows) {
      return sendResponse(res, 404, false, null, 'Education record not found');
    }

    return sendResponse(res, 200, true, null, 'Education record deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = { getEducationByAlumni, addEducation, deleteEducation };
