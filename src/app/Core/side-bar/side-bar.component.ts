import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isExpandedProductManagement: boolean = true;
  isExpandedCatalogManagement: boolean = true;
  isExpandedOrdersManagement: boolean = true;

  constructor() { }

  ngOnInit() {
  }
  expandProductManagement(){
    if(this.isExpandedProductManagement) this.isExpandedProductManagement = false
    else this.isExpandedProductManagement = true
  }
  expandCatalogManagement(){
    if(this.isExpandedCatalogManagement) this.isExpandedCatalogManagement = false
    else this.isExpandedCatalogManagement = true
  }
  expandOrdersManagement(){
    if(this.isExpandedOrdersManagement) this.isExpandedOrdersManagement = false
    else this.isExpandedOrdersManagement = true
  }
  openCustomerSearch(){
    
  }
}
