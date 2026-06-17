const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const getAllSkills = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SKILL ORDER BY skill_name ASC');
    return sendResponse(res, 200, true, rows, 'Skills fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const getAlumniSkills = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT S.skill_id, S.skill_name
       FROM ALUMNI_SKILL ASX
       JOIN SKILL S ON ASX.skill_id = S.skill_id
       WHERE ASX.alumni_id = ?
       ORDER BY S.skill_name ASC`,
      [id]
    );

    return sendResponse(res, 200, true, rows, 'Alumni skills fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const assignSkill = async (req, res, next) => {
  const { id } = req.params;
  const { skill_id } = req.body;

  if (!skill_id) {
    return sendResponse(res, 400, false, null, 'skill_id is required');
  }

  try {
    await pool.query('INSERT INTO ALUMNI_SKILL (alumni_id, skill_id) VALUES (?, ?)', [id, skill_id]);
    return sendResponse(res, 201, true, null, 'Skill assigned successfully');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return sendResponse(res, 400, false, null, 'Skill already assigned to alumni');
    }
    return next(error);
  }
};

const removeSkill = async (req, res, next) => {
  const { id, sid } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM ALUMNI_SKILL WHERE alumni_id = ? AND skill_id = ?', [id, sid]);

    if (!result.affectedRows) {
      return sendResponse(res, 404, false, null, 'Skill mapping not found');
    }

    return sendResponse(res, 200, true, null, 'Skill removed successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllSkills, getAlumniSkills, assignSkill, removeSkill };
