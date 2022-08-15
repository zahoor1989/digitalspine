const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.addProduct = (product) => {
    console.log(product,"<<<<<<<")
}

exports.getProduct = (productId) => {
    console.log(productId,"<<<<<<<")
}

exports.getAllProducts = () => {
    res.status(code).json({
        status: 'success',
        token,
        user
    });

};