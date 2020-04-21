import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { Brand } from 'src/app/Modals/Product/brand.modal';
import { CatalogService } from 'src/app/Services/catalog.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  brand : FormGroup
  brandName : string

  allowNewImage: boolean = true
  editMode: boolean = false
  editModeBrand: Brand
  
  isPopupClosed: boolean = true
  showPreview:boolean = false

  imgUrl: string = ""

  constructor(private route: ActivatedRoute, private catalogService: CatalogService) {
    this.brand = new FormGroup({
      'name': new FormControl(null),
      'status': new FormControl(null),
      'image': new FormControl(null)
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      if(params['name'] != null) this.editMode = true;
      else this.editMode = false;
      this.brandName = params['name']
    })
    if(this.editMode) this.editBrand()
  }
  onAddBrand(){
    console.log(this.brand.value)
  }


  // Popup Related Functions

  onAddImage(){
    if(this.imgUrl == "") return 0
    this.brand.get('image').setValue(this.imgUrl);
    this.isPopupClosed = true
    this.imgUrl = ""
    this.showPreview = false
    this.allowNewImage = false
  }
  openImagePreview(){
    this.showPreview = true
  }
  onRemoveImage(){
    this.brand.get('image').patchValue(null);
    if(this.brand.get('image').value == null) this.allowNewImage = true
    else this.allowNewImage = false
  }
  onOpenPopup(){
    this.isPopupClosed = false
  }
  onPopupClose(){
    this.isPopupClosed = true
    this.showPreview = false
  }

  // Edit Mode Related Functions
  editBrand(){
    setTimeout(()=>{
      this.editModeBrand = this.catalogService.getBrand(this.brandName)
      this.brand.get('name').setValue(this.editModeBrand.name);
      this.brand.get('image').setValue(this.editModeBrand.image);
      this.brand.get('status').setValue(this.editModeBrand.status);
      if(this.brand.get('image').value != '') this.allowNewImage = false
      else this.allowNewImage = true
    }, 2000)
  }
  onSaveChanges(){
    console.log(this.brand.value)
    this.catalogService.updateBrand(this.brandName, this.brand.value)
  }
  onDeleteBrand(){
    this.catalogService.deleteBrand(this.brandName)
  }
}
