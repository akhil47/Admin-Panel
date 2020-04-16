import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

  header: string = 'Matching Results (15)' //number should be dynamic
  columns = ['Category Name', 'ID', 'Sub Categories']
  constructor() { }

  ngOnInit() {
  }

}
