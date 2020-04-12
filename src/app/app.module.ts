import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductModule } from './Product-Management/product.module';
import { CoreModule } from './Core/core.module'
import { SharedModule } from './Shared/shared.module';

import { ProductService } from 'src/app/Services/product.service'
import { DummyServer } from 'src/app/Services/dummy-server.service'
import { SharedComponentService } from './Services/shared-components.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModule,
    CoreModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [],
  providers: [ProductService, SharedComponentService, DummyServer],
  bootstrap: [AppComponent]
})
export class AppModule { }
