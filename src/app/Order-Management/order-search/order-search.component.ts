import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  header: string = 'Matching Results (15)' //number should be dynamic
  columns = ['Order ID/ Product ID', 'Order Status', 'Pincode', 
              'Payment Status', 'Payment Mode', 'Placed On',
               'Shipped On', 'Delivered On', 'Cancelled On',
                'Refund Status', 'Refunded On']
  constructor() { }

  ngOnInit() {
  }

}
