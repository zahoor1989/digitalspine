const User = require('./../models/userModel');
const Order = require('./../models/orderModel');
const AppError = require('./../utils/AppError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.addOrder  = async(req, res, next) => {

    try {
        // getting values form request body
        const {user_id, products, status} = req.body;
        if(user_id &&  products){
            await Order.create({
                user_id,
                products,
                status
            }).then(result => {
                res.status(200).json({
                    status: 'success',
                    message :'Order created successfully',
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
}; 

exports.getOrder = async(req, res, next) => {
    try {
        // getting values form request body
        const { order_id } = req.body;
        if(order_id){
            await Order.findById({
                _id: order_id
            }).then(result => {
                res.status(200).json({
                    status: 'success',
                    message :'Order fetched successfully',
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
};
exports.getOrderByUserId = async(req, res, next) => {
    try {
        // logic for getting order by id
       const { user_id } = req.body;
       if(user_id){
           await Order.find({
               user_id
            }).then(result => {
               res.status(200).json({
                   status: 'success',
                   message :'Order fetched successfully',
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

exports.deleteOrder = async(req, res, next) => {
    try {
     // getting values form request body
     const { order_id } = req.body;
    if(order_id){
         await Order.deleteOne({
             _id: order_id
        }).then(result => {
            res.status(200).json({
                status: 'success',
                message :'Order deleted successfully',
                result
            });
        })
    }else {
        res.status(400).json({
            status: 'error',
            message :'Mandatory feild are missing',
            title:'Missing Fields'
        });
    }
   } catch(err) {
     next(err);
   }
};
exports. getAllOrders = async(req, res, next) => {
    try {
        // getting all orders
        await Order.find().then(result => {
            res.status(200).json({
                status: 'success',
                message :'Order deleted successfully',
                result
            });
        });
      } catch(err) {
        next(err);
      }
}; 