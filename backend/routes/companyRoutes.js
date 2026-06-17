const express = require('express');
const authMiddleware = require('../middleware/auth');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', companyController.getCompanies);
router.post('/', companyController.addCompany);

module.exports = router;
