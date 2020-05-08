import { Component, OnInit } from '@angular/core';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-delivery-location-search',
  templateUrl: './delivery-location-search.component.html',
  styleUrls: ['./delivery-location-search.component.css']
})
export class DeliveryLocationSearchComponent implements OnInit {

  defaultID = "locationName"
  header: string = '' //number should be dynamic
  columns = ['Location name', 'Pincode', 'Status']
  data: Array<TableScrollContainerRowData> = []
  link = "/delivery-locations/"

  matchingLocations = []
  queryFired = false
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }
  searchForLocations(form: NgForm){
    this.matchingLocations = this.orderService.searchDeliveryLocations(form.value.choice, form.value.searchText);
    this.queryFired = true
    this.header = 'Matching Results (' + this.matchingLocations.length + ')'
    this.processResultsData()
  }
  processResultsData(){
    this.data = []
    if(this.matchingLocations.length != 0){
      for(var loc of this.matchingLocations){
        this.data.push(
          new TableScrollContainerRowData(
            loc.pincode,
            [loc.locationName, loc.pincode, loc.status]
          )
        )
      }
    }
  }

}
