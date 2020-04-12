import { NgModule } from "@angular/core";

import { SharedModule } from '../Shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrandDisplayComponent } from './brand-display/brand-display.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { CategoryDisplayComponent } from './category-display/category-display.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';


@NgModule({
    declarations: [
        BrandDisplayComponent,
        BrandEditComponent,
        CategoryDisplayComponent,
        CategoryEditComponent
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
export class CatalogModule{

}