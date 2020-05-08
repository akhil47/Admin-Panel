import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/Services/catalog.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.css']
})
export class BrandSearchComponent implements OnInit {

  header: string = '' //number should be dynamic
  columns = ['Brand Name', 'Status']
  data: Array<TableScrollContainerRowData> = []
  link = "/brand/"

  matchingBrands = []
  queryFired = false
  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
  }
  searchForBrands(form: NgForm){
    
    this.matchingBrands = this.catalogService.searchBrands(form.value.searchText)
    this.queryFired = true
    this.header = 'Matching Results (' + this.matchingBrands.length + ')'
    this.processResultsData()
  }
  processResultsData(){
    this.data = []
    if(this.matchingBrands.length != 0){
      for(var brand of this.matchingBrands){
        this.data.push(
          new TableScrollContainerRowData(
            brand.name,
            [brand.name, brand.status]
          )
        )
      }
    }
  }

}
