var mongoose = require('mongoose');
var schema = mongoose.Schema;

var couponsData = new schema({
  code: String,
  discount: Number,
  maxDiscount: Number,
  minCartValue: Number,
  validFrom: Number,
  validTill: Number,
  description: String,
  status: String
});

module.exports = couponsData;
