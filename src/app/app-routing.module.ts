import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


const appRoutes = [
    {path: '', component: DashboardContentComponent},
    {path: 'product-search', component: ProductSearchComponent},
    {path: 'product/:id', component: ProductDisplayComponent},
    {path: 'product/:id/edit', component: ProductEditComponent},
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