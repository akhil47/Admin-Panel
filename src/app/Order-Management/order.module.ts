import { NgModule } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { OrderSearchComponent } from './order-search/order-search.component';
import { OrderDisplayComponent } from './order-display/order-display.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import{ OrderItemComponent } from './order-item/order-item.component';
import { CouponEditComponent } from './coupon-edit/coupon-edit.component';
import { CouponDisplayComponent } from './coupon-display/coupon-display.component';
import { CouponSearchComponent } from './coupon-search/coupon-search.component'
import { RouterModule } from '@angular/router';
import { EditDeliveryLocationComponent } from './edit-delivery-location/edit-delivery-location.component';
import { DeliveryLocationDisplayComponent } from './delivery-location-display/delivery-location-display.component';
import { DeliveryLocationSearchComponent } from './delivery-location-search/delivery-location-search.component';



@NgModule({
    declarations: [
        OrderSearchComponent,
        OrderDisplayComponent,
        OrderEditComponent,
        OrderItemComponent,
        CouponEditComponent,
        CouponDisplayComponent,
        CouponSearchComponent,
        EditDeliveryLocationComponent,
        DeliveryLocationDisplayComponent,
        DeliveryLocationSearchComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      HttpClientModule,
      RouterModule
    ],
    exports: [
      OrderItemComponent
    ],
    providers: []
  })
export class OrderModule{}