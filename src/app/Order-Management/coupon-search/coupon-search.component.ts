import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/Services/order.service';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';

@Component({
  selector: 'app-coupon-search',
  templateUrl: './coupon-search.component.html',
  styleUrls: ['./coupon-search.component.css']
})
export class CouponSearchComponent implements OnInit {

  header: string  //number should be dynamic
  columns = ['Code', 'Valid From', 'Valid To', 'Discount', 'Min. Cart Value', 'Max. Discount']
  data: Array<TableScrollContainerRowData> = []
  link = "/coupon/"

  searchForm: FormGroup
  queryFired = false
  matchingResults = []


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      code: new FormControl(null),
      discount: new FormControl(null, Validators.pattern("^[0-9]*$")),
      maxDiscount: new FormControl(null, Validators.pattern("^[0-9]*$")),
      minCartValue: new FormControl(null, Validators.pattern("^[0-9]*$")),
      validFrom: new FormControl(null),
      validTill: new FormControl(null)
    })
  }
  searchForCoupons(){
    this.header = 'Matching Results '
    this.matchingResults = this.orderService.searchCoupons(this.searchForm.value)
    this.queryFired = true
    this.header += '(' + this.matchingResults.length + ')'

    this.processResultsData()
  }
  processResultsData(){
    this.data = []
    for(let coupon of this.matchingResults){
      this.data.push(new TableScrollContainerRowData(
        coupon.code,
        [coupon.code, coupon.validFrom, coupon.validTill, coupon.discount, coupon.minCartValue, coupon.maxDiscount]
      ))
    }
  }

}
