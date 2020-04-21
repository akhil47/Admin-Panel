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
  }
  updateProduct(id : string, product){
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
  }
  deleteProduct(id: string){
    // Will recieve product id to delete the product associated with it in DB.
  }
  fetchProducts(params){
    /*
      Get request to search products based on given filters in 'params' and return results.
      Will recieve Params Object which can contain one of many of the following properties:

      Name of parameter               Attribute used to 'params' object to represent it
      ---------------------------------------------------------------------------------
      1. Product ID                 : id
      2. Product name               : name
      3. Brand                      : brand
      4. Gender Group               : gender-group
      5. Category                   : category
      6. Sub category               : sub-category
      7. Status (Active/ Inactive)  : status
      8. Size                       : size
      9. Quantity                   : quantity
      10. Minimum Price             : min-price
      11. Maximum Price             : max-price
      12. Discount                  : discount
      
    */

  }

  //---------------Brand related function calls-------------------

  addBrand(brand){
    // Will recieve JSON Object of Brand to store in DB.
  }
  updateBrand(brand){
    /*
      Will recieve updated JSON object of brand to store in DB.
      Updates will be:
      1. Toggle of category status between Active and Inactive
      2. Change in brand image.

      Editing Brand Name is not allowed so there wont be any update to that.
    */
  }
  deleteBrand(brandName: string){
    // Will recieve name of the brand to be deleted from database.
    // Before deleting a brand all its products must be deleted from DB.
  }
  fetchBrands(pattern: string){
    // Get request to search brand based on given pattern and return all brands which match.
    // eg. pattern = 'L' then 'Levis', 'Louis Phillipe' etc should be returned

  }

  //---------------Category related function calls-----------------

  addCategory(category){
    // Will recieve JSON Object of category to store in DB.
  }
  updateCategory(category, subCategories: string[]){
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

  }
  deleteCategory(categoryName: string){
    /*
      Will recieve name of the category which has to be deleted.
      To delete a category from DB, following steps should be taken:
      1. Delete all products from DB belonging to each sub category under this category.
      2. Then delete category object from DB
    */
  }

  

  onLogin(data) {
    return this.http.post('https://localhost:4300/login', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onSignup(data) {
    return this.http.post('https://localhost:4300/signup', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onAddBrand(data) {
    return this.http.post('https://localhost:4300/addBrand', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onSearchBrand(data) {
    return this.http.post('https://localhost:4300/searchBrand', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
}
