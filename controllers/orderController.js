const User = require('./../models/userModel');
const Order = require('./../models/orderModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.addOrder  = async(req, res, next) => {

    try {
      // logic for adding order
      console.log(req.body,"<<<<<<<Order")

    
    } catch(err) {
        next(err);
    }
}; 

exports.getOrder = async(req, res, next) => {
    try {
        // logic for getting order by id
        console.log(req.body,"<<<<<<<Order")
  
      
      } catch(err) {
        next(err);
      }

};

exports.deleteOrder = async(req, res, next) => {
    try {
        // logic for deleting order
        console.log(req.body,"<<<<<<<Order")
      
      } catch(err) {
        next(err);
      }
    };

exports. getAllOrders = async(req, res, next) => {
    try {
        // logic for getting all orders
  
      
      } catch(err) {
        next(err);
      }

}; 