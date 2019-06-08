import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  header: string = 'Matching Results (15)' //number should be dynamic
  columns = ['Product ID/ Name', 'Brand', 'Category', 'Sub Category', 'Status']
  constructor() { }

  ngOnInit() {
  }

}
