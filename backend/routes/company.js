const express = require('express');
const { getCompanies, addCompany } = require('../controllers/companyController');

const router = express.Router();

router.get('/', getCompanies);
router.post('/', addCompany);

module.exports = router;
