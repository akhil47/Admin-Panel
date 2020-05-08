

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var adminSchema = require('../models/adminSchema');
var admin = mongoose.model('adminData',adminSchema);
var customerSchema = require('../models/customerSchema');
var customer = mongoose.model('customerData',customerSchema);
var productsSchema = require('../models/productsSchema');
var products = mongoose.model('productsData',productsSchema);
var ordersSchema = require('../models/ordersSchema');
var orders = mongoose.model('ordersData',ordersSchema);
var brandsSchema = require('../models/brandsSchema');
var brands = mongoose.model('brandsData',brandsSchema);
var categoriesSchema = require('../models/categoriesSchema');
var categories = mongoose.model('categoriesData',categoriesSchema);
var couponsSchema = require('../models/couponsSchema');
var coupons = mongoose.model('couponsData',couponsSchema);
var id = "5ea006aa567f73142836b008";

router.post('/addBrand',function (req,res) {   //---> WORKING TESTED <---
  let name = req.body.name;
  let status = req.body.status;
  let img = req.body.image;

  let brand = new brands ({name:name,status:status,image:img});

  brand.save(function (err,data) {
    if(err){console.log(err)}
    else{
      res.send({success:true,message:'Brand Added.'})
    }
  });

});

router.post('/deleteBrand',function (req,res) {   //---> WORKING TESTED <---
  let brandName = req.body.name;
  console.log(brandName);

products.remove({brand:brandName},function (err,data) {
  if(err){console.log(err)}
  else{console.log(data);
    brands.remove({name:brandName},function (err1,data1) {
      if(err){console.log(err1)}
      else{console.log(data1);
        res.send({success:true,message:'brand deleted'})
      }
    });
  }
});

});

router.post('/updateBrand',function (req,res) {  //---> WORKING TESTED <---
  let brandName = req.body.name;
  let status = req.body.status;
  let url = req.body.image;


  brands.update({'name':brandName},{
    'status':status,
      'image':url
    },function (err,data) {
    if (err) {
      console.log(err)
    }
    console.log(data);
    return res.send('Brand Updated');
  })

});

router.post('/searchBrand',function(req,res){
  let pattern = req.body.pattern;
  brands.find({"name":pattern},function (err,data) {
    if (err) {
      console.log(err)
    }
    else{
    res.send(data);
  }
  });

});

router.post('/addCategory',function (req,res) {  //---> WORKING TESTED <---
 let name = req.body.name;
 let status = req.body.status;
 let subCategory = req.body.subCategories;
  let category = new categories({name:name,status:status,subCategories:subCategory });


    category.save(function (err,data) {
      if(err){console.log(err)}
      else{
        res.send({success:true,message:'category added'});
      }
    });



});

router.post('/updateCategory',function (req,res) {   //---> WORKING TESTED <---

  let name =req.body.name;
  let updateType = req.body.type;

  let update = req.body;

if(updateType == 'toggle') {  //---> WORKING TESTED <---
  console.log('hello');
let status = req.body.status;
  categories.update({"name": name}, {
      'status':status
    }, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(data);
      res.send({success: true, message: 'Category Updated.'});
    }
  });
}

else if(updateType == 'addSubCategory'){  //---> WORKING TESTED <---
   let newSubCategory = req.body.subCategory;

   categories.update({name: name},{$push:{subCategories:newSubCategory}},function (err,data) {
     if (err) {
       console.log(err)
     }
     else {
       console.log(data)
       res.send({success: true, message: 'SubCategory Added.'});
     }
   });
}

else if(updateType == 'deleteSubCategory'){   //---> WORKING TESTED <---
  let subCategoryName = req.body.subCategoryName;

  categories.update({"name": name},{$pull:{subCategories:{name:subCategoryName}}},function (err,data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(data);
      res.send({success: true, message: 'SubCategory Deleted.'});
    }
  });
}
});

router.post('/deleteCategory',function (req,res) {  //---> WORKING TESTED <---
  let catergoryName =req.body.name;

  products.remove({category:catergoryName},function (err,data) {
    if(err){console.log(err)}
    else{console.log(data);
      categories.remove({name:catergoryName},function (err1,data1) {
        if(err){console.log(err1)}
        else{console.log(data1);
          res.send({success:true,message:'Category deleted'})
        }
      });
    }
  });

});


// PRODUCTS

router.post('/addProduct',function (req,res) {  //---> WORKING TESTED <---
console.log(req.body);

 let productName = req.body.name;
 let brand = req.body.brand;
 let images = req.body.images;
 let category = req.body.category;
 let gender =  req.body.genderGroup;
 let subCategory = req.body.subCategory;
 let status = req.body.status;
 let sizeList = req.body.sizeList;


 let product = new products( {

     name: productName,
     description: 'nothing',
     images: images,
     brand: brand,
     genderGroup: gender,
     category: category,
     subCategory: subCategory,
     status: status,
     sizeList: sizeList
   });


    console.log(req.body);


  product.save(function (err,data) {
    if(err){console.log(err)}
    else{
     let len = data.length;
     let prodId = data._id;
      res.send({success:true,message:'Product Added.',id:prodId})
    }
  });




});

router.post('/updateProduct',function (req,res) {     //---> WORKING TESTED <--- WHOLE PRODUCT OBJECT DATA IS REQUIRED IN UPDATE KEY

  //TO UPDATE DETAILS
  // {
  //   type:"details",
  //     id:"5eb3cf0a4c68af0e60807a81",
  //   update:
  //   {
  //     name:"NIKE T-shirts",
  //       brand: "NIKE"
  //   }
  // }


  // TO ADD Size
  //
  // {
  //   type:"addSize",
  //     id:"",
  //   update:{name: "M",
  //   quantity: 100,
  //   price: 500,
  //   discount: 0,
  //   status: "Active"}
  // }

  // TO REMOVE Size
  //
  // {
  //   type:'removeSize',
  //     id:5eb3cf0a4c68af0e60807a81",
  //     sizeName:"XL"
  // }


    // for SizeList update Whole data of that size is required in the update
  // example
  // {
  //   type:"updateSize"
  //   "query":{"_id": "5eb3cf0a4c68af0e60807a81","sizeList.name":"L"},
  //   "update":{ "sizeList.$.name": "L",
  //   "sizeList.$.quantity": "50",
  //   "sizeList.$.price": 600,
  //   "sizeList.$.discount": 0,
  //   "sizeList.$.status": "Active"
  // }


   let id = req.body.id;
   let type = req.body.type;
  let update = req.body.update;
if(type == 'details'){
  let update = req.body.update;


  products.findOneAndUpdate({'_id':id},{$set:update},function (err,data) {
    if(err){console.log(err)}
    else{
      console.log(data);
      res.send({success:true,message:'Product updated'});
    }
  });

}
else if(type == 'addSize'){
  let update = req.body.update;
  products.update({'_id':id},{$push:{sizeList:update}},function (err,data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(data);
      res.send({success: true, message: 'Size Added'});
    }
  });
}
else if(type == 'removeSize'){
  let update = req.body.sizeName;
  products.update({'_id':id},{$pull:{sizeList:{name:update}}},function (err,data) {
    if(err){console.log(err)}
    else{
      console.log(data);
      res.send({success:true,message:'Size Removed'});
    }
  });
}
else if(type == 'updateSize'){
  let query = req.body.query;
  let update = req.body.update;
  products.update(query,update,function (err,data) {
    if(err){console.log(err)}
    else{
      console.log(data);
      res.send({success:true,message:'Size Updated'});
    }
  });
}
});
router.post('/deleteProduct',function (req,res) {  //---> WORKING TESTED <---
  let id = req.body.id;
  products.remove({_id:id},function (err,data) {
    if(err){console.log(err)}
    else{console.log(data);
          res.send({success:true,message:'Product deleted.'})
    }
  });
});

router.post('/fetchProducts',function (req,res) {   //---> WORKING TESTED <---
  // QUERY DATA SHOULD BE THIS WAY

  // NORMAL QUERIES
  // "query":{
  // "_id":"5eb3ffd3a31c9d0e600e2e38",
  //  "name": "Men's Tshirts",
  //   "description": "nothing",
  //   "brand": "UCB",
  //   "genderGroup": "male",
  //   "category": "Shirts",
  //   "subCategory": "T-Shirt",
  //   "status": "Active"
  // "sizeList.name":"XL"
  // "sizeList.status":"Active"

//IN BETWEEN RANGE PRICE POINT
  // "query":{"$and":[{"sizeList.price":{"$gte":200,"$lte":600}}]}

  //LESS THAN OR EQUAL TO QUANTITY SIZE
  // "query":{"sizeList.quantity":{"$lte":100}}


  let query = req.body.query;
  products.find(query, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(data);
      if (data.length != 0) {
        res.send({success: true, data: data});
      }
      else if (data.length == 0) {
        res.send({success: false, message: "No records found."});
      }
    }
  })

});
router.post('/addCoupon',function (req,res) {   //---> WORKING TESTED <---
  let code = req.body.code;
  let discount = req.body.discount;
  let maxDiscount = req.body.maxDiscount;
  let minCartValue = req.body.minCartValue;
  let validFrom = req.body.validFrom;
  let validTill = req.body.validTill;
  let description = req.body.description;
  let status = req.body.status;

  let coupon = new coupons ({
    code:code,
    discount:discount,
    maxDiscount:maxDiscount,
    minCartValue:minCartValue,
    validFrom:validFrom,
    validTill:validTill,
    description:description,
    status:status
  });

  coupon.save(function (err,data) {
    if(err){console.log(err)}
    else{
      res.send({success:true,message:'coupon Added.'})
    }
  });

});
router.post('/updateCoupon',function (req,res) {  //---> WORKING TESTED <---
  let id = req.body.id;
  let query = req.body.query;
  coupons.update({"_id":id},query,function (err,data) {
    if(err){console.log(err)}
    else{console.log(data);
      res.send({success:true,message:'Coupon Updated.'})
    }
  });
});

router.post('/deleteCoupon',function (req,res) {  //---> WORKING TESTED <---
  let id = req.body.id;
  coupons.remove({_id:id},function (err,data) {
    if(err){console.log(err)}
    else{console.log(data);
      res.send({success:true,message:'Coupon deleted.'})
    }
  });
});

module.exports = router;
