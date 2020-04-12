import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-out-of-stock',
  templateUrl: './out-of-stock.component.html',
  styleUrls: ['./out-of-stock.component.css']
})
export class OutOfStockComponent implements OnInit {

  header: string = 'Out Of Stock Products (15)' //number should be dynamic
  columns = ['ID/ Name', 'Brand', 'Gender Group', 'Category', 'Sub Category', 'Size', 'Quantity', 'Price', 'Discount', 'Status']

  constructor() { }

  ngOnInit(): void {
  }

}
