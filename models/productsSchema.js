var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productsData = new schema(

    {
      name : String,
      description: String,
      images: [String],
      brand: String,
      genderGroup: String,
      category: String,
      subCategory: String,
      status: String,
      sizeList: [{
           name: String,
           quantity: Number,
           price: Number,
           discount: Number,
           status: String
            }]
    }


);


module.exports = productsData;
