var mongoose = require('mongoose');
var schema = mongoose.Schema;

var categoriesSchema = new schema({

    name: {
      type:String,
      unique:true,
      required:true
    },
    status: String,
    subCategories: [{
      name: String,
      status: String
    }]



});


module.exports = categoriesSchema;

