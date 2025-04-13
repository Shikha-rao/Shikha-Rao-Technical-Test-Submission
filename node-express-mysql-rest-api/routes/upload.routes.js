const express = require('express');
const router = express.Router();
const upload = require('../models/upload.middleware');
const controller = require('../controllers/upload.controller');

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Bulk upload products from CSV
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Products uploaded successfully
 */
router.post('/', upload.single('file'), controller.bulkUpload);

module.exports = router;
