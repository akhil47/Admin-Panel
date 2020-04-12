import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ProductSearchComponent } from './Product-Management/product-search/product-search.component';
import { ProductDisplayComponent } from './Product-Management/product-display/product-display.component';
import { ProductEditComponent } from './Product-Management/product-edit/product-edit.component';
import { DashboardContentComponent } from './Core/dashboard-content/dashboard-content.component';
import { OutOfStockComponent } from './Product-Management/out-of-stock/out-of-stock.component';


const appRoutes = [
    {path: '', component: DashboardContentComponent},
    {path: 'product-search', component: ProductSearchComponent},
    {path: 'product/new', component: ProductEditComponent},
    {path: 'product/:id', component: ProductDisplayComponent},
    {path: 'product/:id/edit', component: ProductEditComponent},
    {path: 'out-of-stock', component: OutOfStockComponent},
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