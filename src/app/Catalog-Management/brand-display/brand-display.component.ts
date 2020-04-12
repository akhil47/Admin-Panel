import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Modals/Product/product.modal';

@Component({
  selector: 'app-brand-display',
  templateUrl: './brand-display.component.html',
  styleUrls: ['./brand-display.component.css']
})
export class BrandDisplayComponent implements OnInit {

  brand = {
    name: 'Tommy Hilfiger',
    status: "Active"
  }

  constructor(private router: Router) {
    
  }

  ngOnInit() {}

  onEditDetails(){
    this.router.navigate(['/brand/' + this.brand.name + '/edit'])
    // Brand Edit page must fetch brand object from a service based on brand 'name' in URL
  }
}
