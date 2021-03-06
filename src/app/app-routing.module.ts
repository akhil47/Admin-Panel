import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ProductSearchComponent } from './Product-Management/product-search/product-search.component';
import { ProductDisplayComponent } from './Product-Management/product-display/product-display.component';
import { ProductEditComponent } from './Product-Management/product-edit/product-edit.component';
import { DashboardContentComponent } from './Core/dashboard-content/dashboard-content.component';
import { OutOfStockComponent } from './Product-Management/out-of-stock/out-of-stock.component';
import { BrandDisplayComponent } from './Catalog-Management/brand-display/brand-display.component';
import { BrandEditComponent } from './Catalog-Management/brand-edit/brand-edit.component';
import { CategoryEditComponent } from './Catalog-Management/category-edit/category-edit.component';
import { CategoryDisplayComponent } from './Catalog-Management/category-display/category-display.component';
import { BrandSearchComponent } from './Catalog-Management/brand-search/brand-search.component';
import { CategorySearchComponent } from './Catalog-Management/category-search/category-search.component';
import { OrderSearchComponent } from './Order-Management/order-search/order-search.component';
import { OrderDisplayComponent } from './Order-Management/order-display/order-display.component';
import { OrderEditComponent } from './Order-Management/order-edit/order-edit.component';
import { CouponEditComponent } from './Order-Management/coupon-edit/coupon-edit.component';
import { CouponDisplayComponent } from './Order-Management/coupon-display/coupon-display.component';
import { CouponSearchComponent } from './Order-Management/coupon-search/coupon-search.component';
import { CustomerSearchComponent } from './Customer-Management/customer-search/customer-search.component';
import { EditDeliveryLocationComponent } from './Order-Management/edit-delivery-location/edit-delivery-location.component';
import { DeliveryLocationDisplayComponent } from './Order-Management/delivery-location-display/delivery-location-display.component';
import { DeliveryLocationSearchComponent } from './Order-Management/delivery-location-search/delivery-location-search.component';
import { LoginComponent } from './Core/login/login.component';
import { PanelComponent } from './Core/panel/panel.component';
import { ChangePasswordComponent } from './Core/change-password/change-password.component';
import { CustomerDisplayComponent } from './Customer-Management/customer-display/customer-display.component';


const appRoutes = [
    {path: '', component: PanelComponent, children: [
        {path: '', component: DashboardContentComponent},
        {path: 'change-password', component: ChangePasswordComponent},
        
        {path: 'product-search', component: ProductSearchComponent},
        {path: 'product/new', component: ProductEditComponent},
        {path: 'product/:id', component: ProductDisplayComponent},
        {path: 'product/:id/edit', component: ProductEditComponent},
        {path: 'out-of-stock', component: OutOfStockComponent},

        {path: 'brand/new-brand', component: BrandEditComponent},
        {path: 'brand/:name', component: BrandDisplayComponent},
        {path: 'brand/:name/edit', component: BrandEditComponent},
        {path: 'category/new-category', component: CategoryEditComponent},
        {path: 'category/:name', component: CategoryDisplayComponent},
        {path: 'category/:name/edit', component: CategoryEditComponent},
        {path: 'brand-search', component: BrandSearchComponent},
        {path: 'category-search', component: CategorySearchComponent},

        {path: 'order-search', component: OrderSearchComponent},
        {path: 'order/:id', component: OrderDisplayComponent},
        {path: 'order/:id/edit', component: OrderEditComponent},

        {path: 'coupon/new-coupon', component: CouponEditComponent},
        {path: 'coupon/:id', component: CouponDisplayComponent},
        {path: 'coupon/:id/edit', component: CouponEditComponent},
        {path: 'coupon-search', component: CouponSearchComponent},

        {path: 'delivery-locations/new', component: EditDeliveryLocationComponent},
        {path: 'delivery-locations/search', component: DeliveryLocationSearchComponent},
        {path: 'delivery-locations/:pincode', component: DeliveryLocationDisplayComponent},
        {path: 'delivery-locations/:pincode/edit', component: EditDeliveryLocationComponent},

        {path: 'customer-search', component: CustomerSearchComponent},
        {path: 'customer/:id', component: CustomerDisplayComponent},
    ]},
    {path: 'login', component: LoginComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}