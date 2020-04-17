import { Product } from "../Modals/Product/product.modal";
import { Size } from '../Modals/Product/size.modal';
import { DummyServer } from './dummy-server.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService{
    products = {}

    constructor(private server: DummyServer, private http: HttpClient){
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
    fetchProducts(
        size?: string,
        minPrice?: number,
        maxPrice?: number,
        genderGroup?: string,
        category?: string,
        subCategory?: string,
        brand?: string,
        ){
            var params = {}
            if(size != undefined) params['size'] = size
            if(minPrice != undefined) params['min-price'] = minPrice
            if(maxPrice != undefined) params['max-price'] = maxPrice
            if(genderGroup != undefined) params['gender-group'] = genderGroup
            if(category != undefined) params['category'] = category
            if(subCategory != undefined) params['sub-category'] = subCategory
            if(brand != undefined) params['brand'] = brand

            this.sendPostRequest('www.google.com', params).subscribe(
                (response) => {
                    console.log(response)
                }
            )
            
    }
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
    getProductByID(id){
        return this.products[id]
    }
    addNewProduct(product){
        // Change URL Later and product would be JSON object outputed by form
        this.sendPostRequest('https://admin-panel-37f18.firebaseio.com/products.json', product).subscribe(
            (response) => {

            }
        )
    }
    updateProduct(product: Product){
        // update changes locally in 'Products' Object as well as in database
        
    }


}