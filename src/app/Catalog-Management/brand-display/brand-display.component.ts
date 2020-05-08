import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Modals/Product/product.modal';
import { CatalogService } from 'src/app/Services/catalog.service';
import { Brand } from 'src/app/Modals/Product/brand.modal';

@Component({
  selector: 'app-brand-display',
  templateUrl: './brand-display.component.html',
  styleUrls: ['./brand-display.component.css']
})
export class BrandDisplayComponent implements OnInit {

  brand: Brand

  constructor(private router: Router, 
    private catalogService: CatalogService, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.brand = this.catalogService.getBrand(params['name'])
    })
  }
  onEditDetails(){
    this.router.navigate(['/brand/' + this.brand.name + '/edit'])
  }
}
