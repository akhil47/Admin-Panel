import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CatalogService } from 'src/app/Services/catalog.service';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

  header: string //number should be dynamic
  columns = ['Category Name', 'Status', 'Sub Categories']
  data: Array<TableScrollContainerRowData> = []
  link = "/category/"

  matchingCategories = []
  queryFired = false

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
  }
  searchForCategories(form: NgForm){
    var categoryName = (form.value.category == '')? null : form.value.category
    var subCategoryName = (form.value.subCategory == '')? null : form.value.subCategory
    this.matchingCategories = this.catalogService.searchCategories(categoryName, subCategoryName)
    this.queryFired = true
    this.header = 'Matching Results '
    this.header += '(' + this.matchingCategories.length + ')'
    this.processResultsForDisplay()
  }
  
  processResultsForDisplay(){
    this.data = []
    for(let cat of this.matchingCategories){
      var subCategoryString = ''
      for(let subCat of cat.subCategories){
        subCategoryString += (subCat + '\n')
      }
      this.data.push(new TableScrollContainerRowData(
        cat.name,
        [cat.name, cat.status, subCategoryString]
      ))
    }
  }

}
