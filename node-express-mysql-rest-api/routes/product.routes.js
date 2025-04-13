const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

router.post('/', controller.createProduct);
router.get('/', controller.getProducts);
router.put('/:id', controller.updateProduct);

module.exports = router;
