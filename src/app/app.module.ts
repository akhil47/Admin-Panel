import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableScrollContainerComponent } from './table-scroll-container/table-scroll-container.component';
import { LiveCountersComponent } from './live-counters/live-counters.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    DashboardComponent,
    TableScrollContainerComponent,
    LiveCountersComponent,
    SideBarComponent,
    DashboardContentComponent,
    ProductSearchComponent,
    DropdownComponent,
    ProductDisplayComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
