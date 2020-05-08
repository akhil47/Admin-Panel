import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';
import { Product } from 'src/app/Modals/Product/product.modal';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  header: string //number should be dynamic
  columns = ['ID', 'Brand', 'Gender Group', 'Category', 'Sub Category', 'Size', 'Quantity', 'Price', 'Discount', 'Status']
  data: Array<TableScrollContainerRowData> = []
  link = '/product/'

  searchForm: FormGroup

  matchingResults: Product[] = []
  queryFired = false

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      id          : new FormControl(null),
      brand       : new FormControl(null),
      genderGroup : new FormControl(null),
      category    : new FormControl(null),
      subCategory : new FormControl(null),
      status      : new FormControl(null),
      size        : new FormControl(null),
      quantity    : new FormControl(null, [Validators.pattern("^[0-9]*$")]),
      minPrice    : new FormControl(null, [Validators.pattern("^[0-9]*$")]),
      maxPrice    : new FormControl(null, [Validators.pattern("^[0-9]*$")]),
      discount    : new FormControl(null, [Validators.pattern("^[0-9]*$")])
    })

    this.productService.productsSearchData.subscribe((data) => { 
      console.log(data)
      this.matchingResults = data
      this.header = 'Matching Results '
      this.header += '(' + this.matchingResults.length + ')'
      this.queryFired = true
      this.processResultsData()
    })
  }
  searchProducts(){
    this.productService.fetchProducts(this.searchForm.value)
  }
  processResultsData(){
    this.data = []
    for(let product of this.matchingResults){
      for(let size of product.getSizeList()){
        this.data.push(new TableScrollContainerRowData(
          product.id,
          [
            product.id,
            product.brand,
            product.genderGroup,
            product.category,
            product.subCategory,
            size.name,
            '' + size.quantity,
            'Rs. ' + size.price,
            '' + size.discount + ' %',
            product.status
          ]
        ))
      }
    }
  }

  // Dropdown Functions

  onBrandSelected(brand: string){
    this.searchForm.get('brand').setValue(brand)
  }
  onGenderGroupSelected(genderGroup: string){
    this.searchForm.get('genderGroup').setValue(genderGroup)
  }
  onCategorySelected(category: string){
    this.searchForm.get('category').setValue(category)
  }
  onSubCategorySelected(subCategory: string){
    this.searchForm.get('subCategory').setValue(subCategory)
  }
  onStatusSelected(status: string){
    this.searchForm.get('status').setValue(status)
  }

}