import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { SharedModule } from '../Shared/shared.module';
import { OutOfStockComponent } from './out-of-stock/out-of-stock.component';

@NgModule({
    declarations:[
        ProductDisplayComponent,
        ProductEditComponent,
        ProductSearchComponent,
        OutOfStockComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [],
    providers: []
})
export class ProductModule{

}