const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const getSkillCountByAlumni = async (req, res, next) => {
  const { alumni_id } = req.params;

  try {
    const [[row]] = await pool.query('SELECT skill_count(?) AS total_skills', [alumni_id]);
    return sendResponse(res, 200, true, row, 'Skill count fetched successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = { getSkillCountByAlumni };
