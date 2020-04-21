import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductModule } from './Product-Management/product.module';
import { CatalogModule } from './Catalog-Management/catalog.module';
import { CoreModule } from './Core/core.module'
import { SharedModule } from './Shared/shared.module';

import { ProductService } from 'src/app/Services/product.service'
import { DummyServer } from 'src/app/Services/dummy-server.service'
import { SharedComponentService } from './Services/shared-components.service';
import { CatalogService } from './Services/catalog.service';
import { OrderModule } from './Order-Management/order.module';
import { CustomerSearchComponent } from './Customer-Management/customer-search/customer-search.component';
import { HttpService } from './Services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModule,
    CatalogModule,
    OrderModule,
    CoreModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [],
  providers: [ProductService, CatalogService, SharedComponentService, DummyServer, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
