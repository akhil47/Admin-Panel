import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../Modals/Product/brand.modal';
import { Category } from '../Modals/Product/category.modal';
import { HttpService } from './http.service';

@Injectable()
export class CatalogService{
    brands = {}
    categories = {}
    constructor(private http: HttpClient, private httpService: HttpService){
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

    // Http Functions of Brand

    addNewBrand(brand){
        this.brands[brand['name']] = brand  // Adding Locally
        this.httpService.addBrand(brand)    // Adding in database
    }
    updateBrand(name, brand){
        // Updating locally
        var temp: Brand = this.JSONToBrand(brand)
        this.brands[temp.name] = temp

        // Updating in database
        this.httpService.updateBrand(JSON.stringify(brand))
    }
    deleteBrand(name){
        // Write code to delete Locally
        this.httpService.deleteBrand(name) // Deleting in database
    }
    searchBrands(pattern){
        this.httpService.fetchBrands(pattern)
    }

    // Http Functions of Category

    addNewCategory(category){
        // Adding Locally
        this.categories[category.value['name']] = this.JSONToCategory(category) 
        // Adding in Database
        this.httpService.addCategory(JSON.stringify(category))
    }
    updateCategory(name, category, subCategories: string[]){
        // Editing category name and sub categories name is not allowed
        // Only new sub categories can be added and Active inactive toggle can be done
        // Updating Locally
        this.categories[category.value['name']] = this.JSONToCategory(category)
        // Updating in database
        this.httpService.updateCategory(JSON.stringify(category), subCategories)
    }
    deleteCategory(categoryName){
        // To delete a category all its subcategories and products
        // related to them must be deleted first then category is deleted

        // Deleting locally. After deleting a category
        // clear products data in product service and refetch from database.
        delete this.categories[categoryName]

        // Deleting in database
        this.httpService.deleteCategory(categoryName)

    }


}