import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { ProductSearchComponent } from './product-search/product-search.component';


const appRoutes = [
    {path: '', component: DashboardContentComponent},
    {path: 'product-search', component: ProductSearchComponent}
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