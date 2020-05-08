import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators} from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  /* 

    subCategoriesToRemove   :   Contains removed sub-categories which existed prior to edit.
                                So that products related to this sub-categories can be removed
                                as well from the database.
                                
    existingSubCategories   :   Contains sub-categories existed prior to editing a Category.
                                Using this we can disable editing already existing sub-categories
                                without creating issues for newly added sub categories during edit.

  */

  existingSubCategories: string[] = []
  subCategoriesToRemove: string[] = [] 

  constructor(private router: Router,
    private route: ActivatedRoute, private catalogService: CatalogService) {
    this.category = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'status': new FormControl({value: 'Active', disabled: false}, [Validators.required]),
      'subCategories': new FormArray([])
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
    var newCategoryJSON = this.category.value
    var newCategory = new Category()
    newCategory.copyDataFromJSON(newCategoryJSON)

    this.catalogService.addNewCategory(newCategory, newCategoryJSON)
    this.router.navigate(['/category/', this.category.value.name])
  }

  

  //----------EDIT MODE Functions----------
  editCategory(){
    this.editModeCategory = this.catalogService.getCategory(this.categoryName);
    this.category.get('name').setValue(this.editModeCategory.name);
    this.category.get('status').setValue(this.editModeCategory.status);

    for(var sub of this.editModeCategory.subCategories){
      var temp = new FormControl({value: sub, disabled: false});
      this.existingSubCategories.push(sub);
      (<FormArray>this.category.get('subCategories')).push(temp);
    }

  }
  getSubCategoryControl(index){
    return (<FormArray>this.category.get('subCategories')).controls[index]
  }
  getSubCategoryControls(){
    return (<FormArray>this.category.get('subCategories')).controls
  }
  onAddSubCategory(){
    var temp = new FormControl(null, [Validators.required]);
    (<FormArray>this.category.get('subCategories')).push(temp);
  }
  onRemoveSubCategory(index){
    var subCategoryRemoved = this.category.value.subCategories[index];

    // Checking if sub category removed was pre existing before editing or
    // was added during edit and is removed again
    // below 'If' block works only in 'edit mode'
    
    if(subCategoryRemoved && this.editMode){
      console.log(subCategoryRemoved)
      if(this.existingSubCategories.includes(subCategoryRemoved)){
        this.subCategoriesToRemove.push(subCategoryRemoved)
      }
    }
    (<FormArray>this.category.get('subCategories')).removeAt(index)
  }
  checkSubCategoryDisabledStatus(index){
    // Checks if a subcategory preexisted or added newly during editMode
    // If pre-existed returns true to disable form control of it.
    var cntrl = (<FormArray>this.category.get('subCategories')).controls[index]
    if(this.existingSubCategories.includes(cntrl.value))
      return true
    else
      return false
  }





  // Complete Below Functions

  onSaveChanges(){
    var updatedCategoryJSON = this.category.value
    var updatedCategory = new Category()
    updatedCategory.copyDataFromJSON(updatedCategoryJSON)

    this.catalogService.updateCategory(updatedCategory, updatedCategoryJSON, this.subCategoriesToRemove)
    this.router.navigate(['/category/', this.categoryName])
  }
  onDeleteCategory(){
    
  }

}
