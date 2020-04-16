import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.css']
})
export class BrandSearchComponent implements OnInit {

  header: string = 'Matching Results (15)' //number should be dynamic
  columns = ['Brand Name', 'ID', 'Logo']
  constructor() { }

  ngOnInit() {
  }

}
