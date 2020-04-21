import { Product } from "../Modals/Product/product.modal";
import { Size } from '../Modals/Product/size.modal';
import { DummyServer } from './dummy-server.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ProductService{
    products = {}

    constructor(private httpService: HttpService, private http: HttpClient){
    }
    ngOnInit(){
    }

    JSONToProduct(id: string, productJSON: Object){
        var product = new Product()
        product.name = productJSON['name']
        product.id = id
        product.description = productJSON['description']
        product.images = productJSON['images']
        product.genderGroup = productJSON['gender-group']
        product.brand = productJSON['brand']
        product.category = productJSON['category']
        product.subCategory = productJSON['sub-category']
        product.status = (productJSON['status'] == "Active")? true : false

        var sizeList : Size[] = [];

        for(var i in productJSON['sizeList']){
            sizeList.push(this.JSONToSize(productJSON['sizeList'][i]))
        }
        product.setSizeList(sizeList)

        return product
    }
    JSONToSize(sizeJSON){
        var size = new Size('08/05/2020')
        size.sizeName = sizeJSON['name']
        size.availableQuantity = sizeJSON['quantity']
        size.price = sizeJSON['price']
        size.discount = sizeJSON['discount']
        size.status = (sizeJSON['status'] == "Active")? true : false
        return size
    }
    getProductByID(id){
        return this.products[id]
    }




    // Http functions

    fetchProducts(
        id?: string,
        name?: string,
        brand?: string,
        genderGroup?: string,
        category?: string,
        subCategory?: string,
        status?: boolean,
        size?: string,
        quantity?: number,
        minPrice?: number,
        maxPrice?: number,
        discount?: number
        ){
            var params = {}
            if(id != undefined) params['id'] = id
            if(name != undefined) params['name'] = name
            if(brand != undefined) params['brand'] = brand
            if(genderGroup != undefined) params['gender-group'] = genderGroup
            if(category != undefined) params['category'] = category
            if(subCategory != undefined) params['sub-category'] = subCategory
            if(status != undefined) params['status'] = status
            if(size != undefined) params['size'] = size
            if(quantity != undefined) params['quantity'] = quantity
            if(minPrice != undefined) params['min-price'] = minPrice
            if(maxPrice != undefined) params['max-price'] = maxPrice
            if(discount != undefined) params['discount'] = discount
            
            this.httpService.fetchProducts(params)
            // must return Array of Product class objects (yet to complete function)
            
    }
    addNewProduct(product){
        // parameter 'product' will be of JSON
        this.httpService.addProduct(product)
    }
    updateProduct(id, product){
        var prod = this.JSONToProduct(id, product)
        this.products[id] = prod                    // Updating locally
        this.httpService.updateProduct(id, JSON.stringify(product)) // Updating in database
    }
    deleteProduct(id){
        // write code to remove product locally
        this.httpService.deleteProduct(id) // Removing product from database
    }






    // Firebase Dummy Functions 

    sendPostRequest(url: string, product: Object, parameters?: {}){
        return this.http.post('https://admin-panel-37f18.firebaseio.com/products.json', product)
        //Returned observable must be subscribed
    }
    sendGetRequest(){
        // Http request using query parameters and return response would be "Array of Objects" in JSON
        // which should be parsed by productToJSOn and sizeToJSON
        // Then saved into produts object.
        this.http.get('https://admin-panel-37f18.firebaseio.com/products.json').subscribe(
            (response)=>{
                for(var id in response){
                    var temp =  this.JSONToProduct(id, response[id])
                    this.products[id] = temp;
                }
                console.log(this.products)
            }
        )
        
    }


}