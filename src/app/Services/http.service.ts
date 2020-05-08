import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  //-----------------Product related function calls--------------------

  addProduct(product){
    // Will recieve a JSON object of new product to be stored in DB.


    return this.http.post('http://localhost:4300/addProduct', product, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  updateProduct(product){
    /*
      Will recieve updated JSON object of a product and its ID.
      Updates can one or more of the following:
      1. Product Name
      2. Gender Group
      3. Category
      4. Sub category
      5. Status (Active / Inactive)
      6. Add / Removal of images
      7. Add / Removal of sizes
      8. Modifying Size attributes : quantity, price, discount, status(active/inactive)

      Uneditable fields would be:
      1. Product ID
      2. Product Name
      3. Size Names

    */

    return this.http.post('http://localhost:4300/updateProduct', product, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  deleteProduct(id: string){
    // Will recieve product id to delete the product associated with it in DB.
    return this.http.post('http://localhost:4300/deleteProduct', id, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  fetchProducts(formValues){
    /*
      Get request to search products based on given filters in 'params' and return results.
      Will recieve Params Object which can contain one of many of the following properties:

      Name of parameter               Attribute used to 'params' object to represent it
      ---------------------------------------------------------------------------------
      1. Product ID                 : 'products._id'
      2. Product name               : 'products.name'
      3. Brand                      : 'products.brand'
      4. Gender Group               : 'products.genderGroup'
      5. Category                   : 'products.category'
      6. Sub category               : 'products.subCategory'
      7. Status (Active/ Inactive)  : 'products.status'
      8. Size                       : 'products.sizeList.name'
      9. Quantity                   : 'products.sizeList.quantity'
      10. Minimum Price             : yet to be defined
      11. Maximum Price             : yet to be defined
      12. Discount                  : 'products.sizeList.discount'
      13. Size Status               : 'products.sizeList.status'
      
      Range query minPrice maxPrice
      Range query minDiscount maxDiscount
      Range query minQuantity maxQuantity
    */
   var params = {}

    if(formValues.id != null && formValues.id != '')
      params['products._id'] = formValues.id
    if(formValues.brand != null && formValues.brand != '')
      params['products.brand'] = formValues.brand
    if(formValues.genderGroup != null && formValues.genderGroup != '')
      params['products.genderGroup'] = formValues.genderGroup
      if(formValues.category != null && formValues.category != '')
      params['products.category'] = formValues.category
    if(formValues.subCategory != null && formValues.subCategory != '')
      params['products.subCategory'] = formValues.subCategory
    if(formValues.status != null && formValues.status != '')
      params['products.status'] = formValues.status
    if(formValues.size != null && formValues.size != '')
      params['products.sizeList.name'] = formValues.size
    if(formValues.quantity != null && formValues.quantity != '')
      params['products.sizeList.quantity'] = formValues.quantity
    if(formValues.minPrice != null && formValues.minPrice != '')
      params['products.sizeList.price'] = formValues.minPrice
    // if(formValues.maxPrice != null) params['max-price'] = formValues.maxPrice
    if(formValues.discount != null && formValues.discount != '')
      params['products.sizeList.discount'] = formValues.discount
    console.log(params)

    return this.http.post('http://localhost:4300/fetchProducts', params, {responseType: 'json'}).pipe(
      map((response: any) => {
        console.log(response)
        return response.data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));

  }

  //---------------Brand related function calls-------------------

  addBrand(brand){   //---> WORKING TESTED <--- DATA FORMAT { name:name, status:status, image:img};
    // Will recieve JSON Object of Brand to store in DB.
    return this.http.post('http://localhost:4300/addBrand', brand, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  updateBrand(brand){   //---> WORKING TESTED <---  DATA Format{ name:name, status:status, image:img};
    /*
      Will recieve updated JSON object of brand to store in DB.
      Updates will be:
      1. Toggle of category status between Active and Inactive
      2. Change in brand image.

      Editing Brand Name is not allowed so there wont be any update to that.
    */
    return this.http.post('http://localhost:4300/updateBrand', brand, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));

  }
  deleteBrand(brandName: string){   //---> WORKING TESTED <---  DATA Format {name:name}
    // Will recieve name of the brand to be deleted from database.
    // Before deleting a brand all its products must be deleted from DB.
    return this.http.post('http://localhost:4300/deleteBrand', {brandName:brandName}, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
    //NOT A DB QUERY
  fetchBrands(pattern: string){   //NOT REQUIRED
    // Get request to search brand based on given pattern and return all brands which match.
    // eg. pattern = 'L' then 'Levis', 'Louis Phillipe' etc should be returned
    return this.http.post('http://localhost:4300/searchBrand', {pattern:pattern}, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  //---------------Category related function calls-----------------

  addCategory(category){   //---> WORKING TESTED <---  DATA Format { name: name, status:status , subCategories:{name: name, status: status}}
    // Will recieve JSON Object of category to store in DB.

    return this.http.post('http://localhost:4300/addCategory', category, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  updateCategory(category, subCategories: string[]){  //---> WORKING TESTED <---  DATA Format {name:name , type:(toggle or addSubCategory
    // or deleteSubCategory) , If type == toggle {status:status},else IF type == addSubCategory {name:name, status:status} ,
    // else if type == deleteSubCategory {name:name}
    /*
      Will recieve updated JSON object of category to store in DB.
      Updates will be:
      1. Toggle of category status between Active and Inactive
      2. Addition of new Sub categories
      3. Deletion of existing sub categories

      Will recieve an array of sub categories to be deleted.
      If array is empty then no sub categories are needed to be deleted.

      ----Deletion of Sub categories----
      One sub category should be deleted at a time to do that:
      1. Delete all products from DB belonging to that sub category under this category.
      2. Remove that sub category from category object and move to next sub category to be deleted.

      Existing Subcategory names and category name are not allowed to
      be edited so they remain unchanged
    */

    return this.http.post('http://localhost:4300/addCategory', category, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));

  }
  deleteCategory(categoryName: string){  //---> WORKING TESTED <---  DATA Format  {name: name}
    /*
      Will recieve name of the category which has to be deleted.
      To delete a category from DB, following steps should be taken:
      1. Delete all products from DB belonging to each sub category under this category.
      2. Then delete category object from DB
    */
    return this.http.post('http://localhost:4300/deleteCategory', categoryName, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }



  onLogin(data) {
    return this.http.post('http://localhost:4300/login', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onSignup(data) {
    return this.http.post('http://localhost:4300/signup', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
}
