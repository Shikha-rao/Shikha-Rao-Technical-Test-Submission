const express = require('express');
const router = express.Router();
const controller = require('../controllers/report.controller');

/**
 * GET /report/csv
 * Download products as CSV
 */
router.get('/csv', controller.downloadCSV);

/**
 * GET /report/xlsx
 * Download products as XLSX
 */
router.get('/xlsx', controller.downloadXLSX);

module.exports = router;
