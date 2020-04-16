import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-search',
  templateUrl: './coupon-search.component.html',
  styleUrls: ['./coupon-search.component.css']
})
export class CouponSearchComponent implements OnInit {

  header: string = 'Matching Results (15)' //number should be dynamic
  columns = ['ID / Code', 'Valid From', 'Valid To', 'Discount', 'Min. Cart Value', 'Max. Discount']

  constructor() { }

  ngOnInit(): void {
  }

}
