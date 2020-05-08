import { NgModule } from '@angular/core';
import { TableScrollContainerComponent } from './table-scroll-container/table-scroll-container.component';
import { PopupComponent } from './popup/popup.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        TableScrollContainerComponent,
        PopupComponent,
        DropdownComponent,
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        TableScrollContainerComponent,
        FormsModule,
        PopupComponent,
        DropdownComponent
    ],
    providers: []
})
export class SharedModule{

}