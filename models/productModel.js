const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Enter a title.'],
    },
    display_image: {
        type: String,
        require: [true, 'Image url is required.'],
        validate: [validator.isURL, 'Enter valid image url.']
    },
    description: {
        type: String,
        required: [true, 'Enter product discription.'],
        minLength: [20, 'Discription. should be at least 50 characters']
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
    price: {
        currency: {
            type: String
        },
      value: {
          type: Number,
          required: true
      }
    }
});

//schema middleware to apply before saving 
productSchema.pre('save', async function(next) {
    next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;