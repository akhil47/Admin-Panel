var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userData = new schema({
      name: {
            type:String,
            unique:true,
            required:true
      },
      mobile_no: Number,
      email:{
            type:String,
            unique: true,
            required: true
      },
      gender: String,
      address: [{
            name: String,
            mobile_no: Number,
            door_no: String,
            area: String,
            city: String,
            state: String,
            pincode: Number
      }],
      wishlist: [String],

    cart: [{
      product_id: String,
      size: String,
      quantity: Number
    }],
    orders:[String],
    status: Boolean
});


module.exports = userData;
