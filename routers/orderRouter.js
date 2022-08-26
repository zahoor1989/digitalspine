const express = require('express');
const orderController = require('./../controllers/orderController');
const router = express.Router();

router.post('/addOrder', orderController.addOrder); 
router.post('/getOrder', orderController.getOrder); 
router.post('/getOrderByUserId', orderController.getOrderByUserId); 
router.post('/deleteOrder', orderController.deleteOrder); 
router.get('/getAllOrders', orderController.getAllOrders); 

module.exports = router; 