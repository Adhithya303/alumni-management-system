const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const getCompanies = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM COMPANY ORDER BY company_name ASC');
    return sendResponse(res, 200, true, rows, 'Companies fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const addCompany = async (req, res, next) => {
  const { company_name, industry, location } = req.body;

  if (!company_name) {
    return sendResponse(res, 400, false, null, 'company_name is required');
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO COMPANY (company_name, industry, location) VALUES (?, ?, ?)',
      [company_name, industry, location]
    );

    return sendResponse(res, 201, true, { company_id: result.insertId }, 'Company added successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = { getCompanies, addCompany };
