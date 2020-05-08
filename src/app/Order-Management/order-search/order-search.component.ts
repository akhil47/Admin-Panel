import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  defaultID = 'orderID'
  header: string = 'Matching Results (15)' //number should be dynamic
  columns = ['Order ID', 'Order Status', 'Pincode', 
              'Payment Status', 'Payment Mode', 'Placed On',
               'Shipped On', 'Delivered On', 'Cancelled On',
                'Refund Status', 'Refunded On']
  data : Array<TableScrollContainerRowData> = []
  link = '/order/'

  queryFired = false
  matchingResults = []

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }
  searchForOrders(form: NgForm){
    console.log(form.value)

    this.matchingResults = this.orderService.searchOrders() //Complete this function
    this.queryFired = true

    if(form.value['idType']== 'productID') this.columns[0] = 'Product ID'
    else this.columns[0] = 'Order ID'
    this.processResultsData()
  }
  processResultsData(){
    this.data = []
    for(let order of this.matchingResults){
      this.data.push(new TableScrollContainerRowData(
        // fill in
      ))
    }
  }
}
