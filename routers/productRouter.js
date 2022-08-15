const express = require('express');
const productController = require('./../controllers/productController');
const router = express.Router();

router.post('/addProduct', productController.addProduct); 
router.post('/getProduct', productController.getProduct); 
router.get('/getProducts', productController.getAllProducts); 

module.exports = router; 