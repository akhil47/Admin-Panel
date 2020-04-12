import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Modals/Product/product.modal';
import { Size } from 'src/app/Modals/Product/size.modal';

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

  // ngFor loop variables for template optimization
  mainControlNames = {
    "name": "Product Name",
    "brand": "Brand",
    "gender-group": "Gender Group",
    "category": "Category",
    "sub-category": "Sub Category"
  }

  sizeListHeaders = ["Size Name", "Available Quantity", "Price", "Discount", "Status"]
  sizeControlNames = ["name", "quantity", "price", "discount"]

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.product = new FormGroup({
      'name' : new FormControl(null),
      'id' : new FormControl(null),
      'images': new FormArray([]),
      'brand' : new FormControl(null),
      'gender-group' : new FormControl(null),
      'category' : new FormControl(null),
      'sub-category' : new FormControl(null),
      'status' : new FormControl(null),
      'sizeList' : new FormArray([])
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      if(params['id'] != null) this.editMode = true;
      else this.editMode = false;
      this.productID = +params['id']
    })
    if(this.editMode) this.test()
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
    console.log(index);
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
      'name': new FormControl(null),
      'quantity': new FormControl(null),
      'price': new FormControl(null),
      'discount': new FormControl(null),
      'status' : new FormControl(null)
    });
    (<FormArray>this.product.get('sizeList')).push(newSize);
  }
  removeSizeControl(index: number){
    (<FormArray>this.product.get('sizeList')).removeAt(index);
  }
  
  getSizeControls(){
    return (<FormArray>this.product.get('sizeList'))
  }



  returnZero(){
    return 0;
  }
  onSubmit(){
    console.log(JSON.stringify(this.product.value));
  }

  // Edit Mode Related Functions

  addSizeToEdit(s : Size){
    var newSize = new FormGroup({
      'name': new FormControl({value: s.sizeName, disabled: false}),
      'quantity': new FormControl({value: s.availableQuantity, disabled: false}),
      'price': new FormControl({ value: s.price, disabled: false }),
      'discount': new FormControl({value: s.discount, disabled: false}),
      'status' : new FormControl({value : (s.status == true? "Active": "Inactive"), disabled: false})
    });
    (<FormArray>this.product.get('sizeList')).push(newSize);
  }

  test(){
    this.productService.sendGetRequest()
    setTimeout(() => {
      console.log(this.productService.products)
      this.editModeProduct = this.productService.getProductByID(29785666)
      this.editProduct()
    }, 2000);
    
  }
  editProduct(){
    
    this.product.get('name').setValue(this.editModeProduct.name);
    this.product.get('id').setValue(this.editModeProduct.id);
    this.product.get('brand').setValue(this.editModeProduct.brand);
    this.product.get('gender-group').setValue(this.editModeProduct.genderGroup);
    this.product.get('category').setValue(this.editModeProduct.category);
    this.product.get('sub-category').setValue(this.editModeProduct.subCategory);
    this.product.get('status').setValue(this.editModeProduct.status == true ? "Active" : "Inactive");

    for(let i of this.editModeProduct.images){
      var cntl = new FormControl({value: i, disabled: false});
      (<FormArray>this.product.get('images')).push(cntl);
    }

    for(let i of this.editModeProduct.getSizeList()){
      this.addSizeToEdit(i)
    }
  }
  onSaveChanges(){
    console.log(this.productService.JSONToProduct(this.product.value))
    // Update this back to products array in service and from there to database
    // after update use subject to publish update to all other components

  }



}