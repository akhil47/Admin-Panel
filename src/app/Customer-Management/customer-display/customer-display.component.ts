import { Component, OnInit } from '@angular/core';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';

@Component({
  selector: 'app-customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.css']
})
export class CustomerDisplayComponent implements OnInit {

  heading = "Orders placed till date"
  headers = ['Order ID', 'Placed On', 'Order Value', 'Payment Status', 'Order Status']
  data : Array<TableScrollContainerRowData> = []
  link = '/order/'
  displayPicture = "https://bit.ly/2Wvkkg8"
  constructor() { }

  ngOnInit(): void {
    this.processTableData()
  }
  processTableData(){
    for(var i in [1,2,3,4,5,6,7,8,9,0,2,3,4,5,6,7,8,9,0,2,3,4,5,6,7,8,9,0,2,3,4,5,6,7,8,9,0]){
      let temp = new TableScrollContainerRowData(
        'kkjij223iji2j3',
        ['kkjij223iji2j3', '12-03-2020', 'Rs. 2000', 'Complete', 'Shipped']
      )
      this.data.push(temp)
    }
  }

}
