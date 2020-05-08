import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Modals/Product/product.modal';
import { Size } from 'src/app/Modals/Product/size.modal';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product : FormGroup;

  editMode: boolean = false
  editModeProduct: Product
  productID : any


  isPopupClosed: boolean = true
  showPreview:boolean = false

  imgUrl: string = ""

  // Validation boolean variables
  isBrandOpened = false
  isGenderGroupOpened = false
  isCategoryOpened = false
  isSubCategoryOpened = false

  sizeListHeaders = ["Size Name", "Available Quantity", "Price", "Discount", "Status"]
  sizeControlNames = ["name", "quantity", "price", "discount"]

  constructor(private router: Router,
    private route: ActivatedRoute, private productService: ProductService) {
    this.product = new FormGroup({
      'name'        : new FormControl(null, [Validators.required]),
      'id'          : new FormControl(null),
      'images'      : new FormArray([]),
      'brand'       : new FormControl(null, [Validators.required]),
      'genderGroup' : new FormControl(null, [Validators.required]),
      'category'    : new FormControl(null, [Validators.required]),
      'subCategory' : new FormControl(null, [Validators.required]),
      'status'      : new FormControl({value: 'Active', disabled: false}, [Validators.required]),
      'sizeList'    : new FormArray([])
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      if(params['id'] != null) this.editMode = true;
      else this.editMode = false;
      this.productID = params['id']
    })
    if(this.editMode) this.editProduct()
  }
  returnZero(){
    return 0;
  }
  onAddProduct(){
    var newProductJSON = this.product.value;
    this.productService.addNewProduct(newProductJSON);
  }

  // Dropdown related functions

  brandSelected(item: any){
    this.product.get('brand').setValue(item);
    console.log(item)
  }
  genderGroupSelected(item: any){
    this.product.get('genderGroup').setValue(item);
  }
  categorySelected(item: any){
    this.product.get('category').setValue(item);
  }
  subCategorySelected(item: any){
    this.product.get('subCategory').setValue(item);
  }
  brandOpened(){
    this.isBrandOpened = true
  }
  genderGroupOpened(){
    this.isGenderGroupOpened = true
  }
  categoryOpened(){
    this.isCategoryOpened = true
  }
  subCategoryOpened(){
    this.isSubCategoryOpened = true
  }


  // Popup Related Functions

  onAddImage(){
    if(this.imgUrl == "") return 0
    var img = new FormControl();
    img.setValue(this.imgUrl);
    (<FormArray>this.product.get('images')).push(img);
    this.isPopupClosed = true
    this.imgUrl = ""
    this.showPreview = false
  }
  openImagePreview(){
    this.showPreview = true
  }
  onRemoveImage(index){
    (<FormArray>this.product.get('images')).removeAt(index);
  }
  getImageControls(){
    return (<FormArray>this.product.get('images'))
  }
  onOpenPopup(){
    this.isPopupClosed = false
  }
  onPopupClose(){
    this.isPopupClosed = true
    this.showPreview = false
  }




// Size List Related Functions

  addSizeControl(){
    var newSize = new FormGroup({
      'name'    : new FormControl(null, [Validators.required]),
      'quantity': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'price'   : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'discount': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'status'  : new FormControl({value: 'Active', disabled: false}, [Validators.required])
    });
    (<FormArray>this.product.get('sizeList')).push(newSize);
  }
  removeSizeControl(index: number){
    (<FormArray>this.product.get('sizeList')).removeAt(index);
  }
  getSizeControls(){
    return (<FormArray>this.product.get('sizeList'))
  }
  validateSizeField(index, controlName){
    var fieldControl = (<FormArray>this.product.get('sizeList')).controls[index].get(controlName)
    if(fieldControl.touched && !fieldControl.valid) return true
    else return false
  }



  

  // Edit Mode Related Functions

  addSizeToEdit(s : Size){
    var newSize = new FormGroup({
      'name'    : new FormControl({value: s.name, disabled: false}),
      'quantity': new FormControl({value: s.quantity, disabled: false}),
      'price'   : new FormControl({ value: s.price, disabled: false }),
      'discount': new FormControl({value: s.discount, disabled: false}),
      'status'  : new FormControl({value : s.status, disabled: false})
    });
    (<FormArray>this.product.get('sizeList')).push(newSize);
  }

  editProduct(){
    this.editModeProduct = this.productService.getProductByID(this.productID)
    this.product.get('name').setValue(this.editModeProduct.name);
    this.product.get('id').setValue(this.editModeProduct.id);
    this.product.get('brand').setValue(this.editModeProduct.brand);
    this.product.get('genderGroup').setValue(this.editModeProduct.genderGroup);
    this.product.get('category').setValue(this.editModeProduct.category);
    this.product.get('subCategory').setValue(this.editModeProduct.subCategory);
    this.product.get('status').setValue(this.editModeProduct.status);

    for(let i of this.editModeProduct.images){
      var cntl = new FormControl({value: i, disabled: false});
      (<FormArray>this.product.get('images')).push(cntl);
    }

    for(let i of this.editModeProduct.getSizeList()){
      this.addSizeToEdit(i)
    }
  }
  onSaveChanges(){
    var updatedProduct = new Product()
    var updatedProductJSON = this.product.value
    updatedProduct.copyDataFromJSON(this.product.value)

    this.productService.updateProduct(updatedProduct, updatedProductJSON)
    this.router.navigate(['/product/', this.productID])
    // Update this back to products array in service and from there to database
    // after update use subject to publish update to all other components
  }
  onDeleteProduct(){
    this.productService.deleteProduct(this.productID)
    // Update this back to products array in service and from there to database
    // after update use subject to publish update to all other components
  }
  
}

