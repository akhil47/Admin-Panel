import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

  header: string = 'Matching Results (15)' //number should be dynamic
  columns = ['ID', 'Name']

  constructor() { }

  ngOnInit(): void {
  }

}
