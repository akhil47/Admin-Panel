import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../Modals/Product/brand.modal';
import { Category } from '../Modals/Product/category.modal';

export class CatalogService{
    brands = {}
    categories = {}
    constructor(private http: HttpClient){
        this.sendGetRequest()
    }
    ngOnInit(){
    }
    sendGetRequest(){
        // Http request using query parameters and return response would be "Array of Objects" in JSON
        // which should be parsed and
        // Then saved into produts object.
        this.http.get('https://admin-panel-37f18.firebaseio.com/brands.json').subscribe(
            (response)=>{
                for(var b in response){
                    this.brands[response[b]['name']] = this.JSONToBrand(response[b])
                }
            }
        )
        this.http.get('https://admin-panel-37f18.firebaseio.com/categories.json').subscribe(
            (response)=>{
                for(var c in response){
                    this.categories[response[c]['name']] = this.JSONToCategory(response[c])
                }
            }
        )
        
    }
    JSONToBrand(brandJSON){
        var brand = new Brand()
        brand.name = brandJSON['name']
        brand.image = brandJSON['image']
        brand.status = brandJSON['status']
        return brand
    }
    JSONToCategory(categoryJSON){
        var category = new Category();
        category.name = categoryJSON['name']
        category.status = categoryJSON['status']
        category.subCategories = []
        for(var sub in categoryJSON['sub-categories']){
            category.subCategories.push(categoryJSON['sub-categories'][sub])
        }
        
        return category
    }
    getBrand(name){
        console.log(this.brands[name])
        return this.brands[name]
    }
    getCategory(name){
        console.log(this.categories)
        return this.categories[name]
    }

}