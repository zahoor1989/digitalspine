const mongoose = require('mongoose');
const { array } = require('mongoose/lib/utils');
const validator = require('validator');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    user_id: {
        type: Number,
        required: [true, 'User id is required']
    },
    products:{
        type: Array,
        items:[
            {
            title: {
                type: String,
                required: [true, 'Enter a title.'],
                validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
            },
            display_image: {
                type: String,
                require: [true, 'Image url is required.'],
                validate: [validator.isDataURI, 'Enter valid image url.']
            },
            description: {
                type: String,
                required: [true, 'Enter product discription.'],
                minLength: [50, 'Discription. should be at least 50 characters']
            }, 
            brand: {
                type: String,
                required: [true, 'Enter product brand.'],
                minLength: [4, 'Brand should be at least 4 characters']
            }, 
            category: {
                type: String,
                required: [true, 'Enter product category.'],
                minLength: [10, 'Category should be at least 10 characters']
            },
            tags: {
                type: [{
                    type:String
                }],
                minLength: [10, 'Category should be at least 10 characters']
            },
            available:{
                type: Boolean,
                default:true
            },
            is_best_seller:{
                type:Boolean,
                default:false
            },
            price:{
                currency: {
                    type: String
                },
                value: {
                    type: Number,
                    required: true
                }
            }
        }]
    },
    status: {
     type: Boolean,
     default:false
    }
});

//schema middleware to apply before saving 
orderSchema.pre('save', async function(next) {
    next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;