var mongoose = require('mongoose');
var schema = mongoose.Schema;

var brandsData = new schema({

  name: {
    type:String,
    unique:true,
    required:true
  },
  image: String,
  status: String
});


module.exports = brandsData;
