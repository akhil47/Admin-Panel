var mongoose = require('mongoose');
var schema = mongoose.Schema;

var adminData = new schema({
  username:{
    type:String,
    unique:true,
    required:true
  },
  email:{
    type:String,
    unique: true,
    required: true
  },
  password:String,

});

module.exports = adminData;
