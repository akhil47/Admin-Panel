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
    }
    ngOnInit(){
        
    }

    // -----------Brand Functions-----------

    addNewBrand(brand: Brand, brandJSON: object){
        this.brands[brand.name] = brand

        this.httpService.addBrand(brandJSON).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
    updateBrand(brand: Brand, brandJSON: object){
        this.brands[brand.name] = brand

        this.httpService.updateBrand(brandJSON).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
    deleteBrand(name: string){
        delete this.brands[name]

        this.httpService.deleteBrand(name).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
    searchBrands(pattern: string){
        var b = new Brand()
        b.name = "Tommy Hilfiger"
        b.image = "https://assets.jassets.com/h_600,q_95,w_440/v1/assets/images/productImage/2018/7/6/cd37416d-5556-4024-9d7f-bb5ebde43a6a1530825330030-1.webp"
        b.status = "Active"
        this.brands[b.name] = b
        var c = new Brand()
        c.name = "Tony & Guy"
        c.image = "https://assets.jassets.com/h_600,q_95,w_440/v1/assets/images/productImage/2018/7/6/cd37416d-5556-4024-9d7f-bb5ebde43a6a1530825330030-1.webp"
        c.status = "Active"
        this.brands[c.name] = c
        
        // Search is performed on local data
        // All brands will be fetched from server and saved locally at startup
        var p = new RegExp(pattern)
        var matchingBrands = []
        for(let brand of Object.keys(this.brands)){
            var result = brand.match(p)
            if(result != null){
                // 'input' is property of match() returned object
                matchingBrands.push(this.brands[result.input])
            }
        }
        return matchingBrands
    }
    getBrand(name){
        return this.brands[name]
    }

    

    // -----------Category Functions-----------
    
    addNewCategory(category: Category, categoryJSON: object){ //NOT GETTING SUBCATEGORY STATUS DATA and SubCategory name is without a key
        this.categories[category.name] = category
        
        this.httpService.addCategory(categoryJSON).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
    updateCategory(category: Category, categoryJSON: object, subCategories: string[]){
        // Editing category name and sub categories name is not allowed
        // Only new sub categories can be added and Active inactive toggle can be done

        // Updating Locally
        // Write code to remove all products existing locally which belong 
        // to deleted sub categories.
        this.categories[category.name] = category
        
        // Updating in DB
        this.httpService.updateCategory(categoryJSON, subCategories).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
    deleteCategory(name: string){
        // To delete a category all its subcategories and products
        // related to them must be deleted first then category is deleted

        // Deleting locally. After deleting a category
        // clear products data in product service and refetch from database.
        delete this.categories[name]

        // Deleting in database
        this.httpService.deleteCategory(name).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );

    }
    searchCategories(category?: string, subCategory?: string): Array<Category>{
        var c1 = new Category()
        c1.name = 'Clothing'
        c1.status = 'Active'
        c1.subCategories = ['Casual Shirts', 'T-Shirts']
        this.categories[c1.name] = c1
        var c2 = new Category()
        c2.name = 'Sports'
        c2.status = 'Active'
        c2.subCategories = ['Joggers', 'T-Shirts']
        this.categories[c2.name] = c2



        var matchingCategories: Category[] = []
        if(category == null && subCategory == null){
            for(let key of Object.keys(this.categories)){
                matchingCategories.push(this.categories[key])
            }
        }
        else if(category != null && subCategory == null){
            for(let key of Object.keys(this.categories)){
                
                if(key == category)
                    matchingCategories.push(this.categories[key])
            }
        }
        else if(category == null && subCategory != null){
            for(let key of Object.keys(this.categories)){
                if(this.categories[key].subCategories.includes(subCategory)){
                    matchingCategories.push(this.categories[key])
                }
            }
        }
        else{
            for(let key of Object.keys(this.categories)){
                if(key == category){
                    if(this.categories[key].subCategories.includes(subCategory)){
                        matchingCategories.push(this.categories[key])
                    }
                }      
            }
        }
        return matchingCategories
    }
    getCategory(name){
        return this.categories[name]
    }
}
