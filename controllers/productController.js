const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.addProduct = (req, res, next) => {
    console.log(req.body,"<<<<<<<addProduct")
}

exports.getProduct = (req, res, next) => {
    console.log(req.body,"<<<<<<<")
}

exports.getAllProducts = (req, res, next) => {
    
    res.status(code).json({
        status: 'success',
        token,
        user
    });

};