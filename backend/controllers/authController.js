const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { sendResponse } = require('../utils/response');

const register = async (req, res, next) => {
  const { name, email, phone, dob, gender, username, password, role } = req.body;

  if (!name || !email || !username || !password) {
    return sendResponse(res, 400, false, null, 'Name, email, username and password are required');
  }

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [alumniResult] = await connection.query(
      'INSERT INTO ALUMNI (name, email, phone, dob, gender) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, dob || null, gender || null]
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      'INSERT INTO USER_ACCOUNT (alumni_id, username, password, role) VALUES (?, ?, ?, ?)',
      [alumniResult.insertId, username, hashedPassword, role === 'admin' ? 'admin' : 'alumni']
    );

    await connection.commit();
    return sendResponse(res, 201, true, { alumni_id: alumniResult.insertId }, 'User registered successfully');
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    if (error.code === 'ER_DUP_ENTRY' || error.sqlState === '45000') {
      return sendResponse(res, 400, false, null, error.sqlMessage || error.message);
    }
    return next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return sendResponse(res, 400, false, null, 'Username and password are required');
  }

  try {
    const [rows] = await pool.query(
      `SELECT U.user_id, U.alumni_id, U.username, U.password, U.role, A.name, A.email
       FROM USER_ACCOUNT U
       JOIN ALUMNI A ON U.alumni_id = A.alumni_id
       WHERE U.username = ?`,
      [username]
    );

    if (!rows.length) {
      return sendResponse(res, 401, false, null, 'Invalid credentials');
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return sendResponse(res, 401, false, null, 'Invalid credentials');
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        alumni_id: user.alumni_id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return sendResponse(
      res,
      200,
      true,
      {
        token,
        user: {
          user_id: user.user_id,
          alumni_id: user.alumni_id,
          username: user.username,
          role: user.role,
          name: user.name,
          email: user.email,
        },
      },
      'Login successful'
    );
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
