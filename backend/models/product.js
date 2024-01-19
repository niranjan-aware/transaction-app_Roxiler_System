const mongoose = require('mongoose');
const {Schema}=mongoose

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
  },
  dateOfSale: {
    type: String,
    required: true
  },
  month:{
    type:String,
    required:true
  }
});


const moment = require('moment');

productSchema.pre('save', function (next) {
  // Check if dateOfSale is present and is a valid Date
  if (this.dateOfSale instanceof Date) {
    // Format the date using Moment.js
    this.dateOfSale = moment(this.dateOfSale).format("YY/MM/DD");
  } else if (typeof this.dateOfSale === 'string') {
    // If dateOfSale is a string, parse it to a Date and then format
    this.dateOfSale = moment(new Date(this.dateOfSale)).format("YY/MM/DD");
  } else {
    // If dateOfSale is not a valid Date or string, handle it accordingly (e.g., log an error)
    console.error('Invalid date format for dateOfSale:', this.dateOfSale);
  }

  // Continue with the save operation
  next();
}); 



const Product = mongoose.model('Product', productSchema);

module.exports = Product;
