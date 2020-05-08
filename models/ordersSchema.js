var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ordersData = new schema({

    customer_id:String,
    customerName:String,
    address: String,
    order_timeline: {
      placement_date: Date,
      shipped_date: Date,
      delivery_date: Date,
      cancelled_date: Date,
      refund_issue_date: Date,
    },

    order_details: {
      cart_items: [{
        product_id: String,
        size: String,
        quantity: Number,
        price: Number,
        discount: Number
      }],

      MRP: Number,
      shipping_charges: Number,
      GST: Number,
      discount: Number,
      coupon_id: String,
      coupon_discount: Number,
      total: Number

    },

    payment_mode: String,
    payment_status: String,
    order_status: String,
    refund_status: String,
    mode_of_refund: String



});


module.exports = ordersData;
