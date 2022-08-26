const express = require('express');
const productController = require('./../controllers/productController');
const router = express.Router();

router.post('/addProduct', productController.addProduct); 
router.post('/getProductById', productController.getProductById); 
router.get('/getAllProducts', productController.getAllProducts); 

module.exports = router; 