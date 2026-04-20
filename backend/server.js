require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const { sendResponse } = require('./utils/response');

const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni');
const educationRoutes = require('./routes/education');
const companyRoutes = require('./routes/company');
const jobRoutes = require('./routes/job');
const skillRoutes = require('./routes/skill');
const eventRoutes = require('./routes/event');
const userRoutes = require('./routes/user');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => sendResponse(res, 200, true, { status: 'ok' }, 'Server is healthy'));

app.use('/api/auth', authRoutes);

app.use('/api', authMiddleware);
app.use('/api/alumni', alumniRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', skillRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  return sendResponse(res, 404, false, null, 'Route not found');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
