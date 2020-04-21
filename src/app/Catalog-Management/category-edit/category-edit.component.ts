import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray} from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { Brand } from 'src/app/Modals/Product/brand.modal';
import { CatalogService } from 'src/app/Services/catalog.service';
import { Category } from 'src/app/Modals/Product/category.modal';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category : FormGroup
  categoryName : string

  editMode: boolean = false
  editModeCategory: Category
  
  constructor(private route: ActivatedRoute, private catalogService: CatalogService) {
    this.category = new FormGroup({
      'name': new FormControl(null),
      'status': new FormControl(null),
      'sub-categories': new FormArray([])
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      if(params['name'] != null) this.editMode = true;
      else this.editMode = false;
      this.categoryName = params['name']
    })
    if(this.editMode) this.editCategory()
  }
  onAddCategory(){
    console.log(this.category.value)
    this.catalogService.addNewCategory(this.category.value)
  }

  // Edit Mode Related Functions
  editCategory(){
    setTimeout(()=>{
      this.editModeCategory = this.catalogService.getCategory(this.categoryName);
      this.category.get('name').setValue(this.editModeCategory.name);
      this.category.get('status').setValue(this.editModeCategory.status);

      for(var sub of this.editModeCategory.subCategories){
        var temp = new FormControl(null);
        temp.setValue(sub);
        (<FormArray>this.category.get('sub-categories')).push(temp);
        // sub-categories are not being pushe
      }
      console.log(this.category.value)
    }, 2000)
  }
  getSubCategoryControls(){
    return (<FormArray>this.category.get('sub-categories')).controls
  }
  onAddSubCategory(){
    var temp = new FormControl(null);
    (<FormArray>this.category.get('sub-categories')).push(temp);
  }
  onRemoveSubCategory(index){
    (<FormArray>this.category.get('sub-categories')).removeAt(index)
  }


  // Complete Below Functions

  onSaveChanges(){
    console.log(this.category.value)
  }
  onDeleteCategory(){
  }

}
