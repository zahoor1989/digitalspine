const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.addProduct = async(req, res, next) => {
    try {
        // getting values form request body
        const {products} = req.body;
        if(products){
            await Product.insertMany(products).then(result => {
                res.status(200).json({
                    status: 'success',
                    message :'Products created successfully',
                    result
                });
            })
        }else{
            res.status(400).json({
                status: 'error',
                message :'Mandatory feild are missing',
                title:'Missing Fields'
            });
        }
    } catch(err) {
        next(err);
    }
}

exports.getProductById = (req, res, next) => {
    console.log(req.body,"<<<<<<<")
}

exports.getAllProducts = async(req, res, next) => {
    try {
        // fetching products
        await Product.find().then(result => {
            res.status(200).json({
                status: 'success',
                message :'Products fetched successfully',
                result
            });
        })
    } catch(err) {
        next(err);
    }
};