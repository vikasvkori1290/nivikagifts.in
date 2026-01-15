const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

// POST /api/products - Create a new product with images
router.post('/', upload.array('images', 5), productController.createProduct);

// GET /api/products - Get all products (with optional category filter)
router.get('/', productController.getProducts);

// GET /api/products/:id - Get single product
router.get('/:id', productController.getProductById);

module.exports = router;
