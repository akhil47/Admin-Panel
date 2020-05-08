import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from 'src/app/Services/product.service'
import { Product } from 'src/app/Modals/Product/product.modal';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  product: Product

  constructor(private router: Router,
    private route: ActivatedRoute, private productService: ProductService) {
    
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.product = this.productService.getProductByID(params['id'])
      }
    )
  }
  onEditDetails(){
    this.router.navigate(['/product/' + this.product['id'] + '/edit'])
  }
  returnZero(){
    return 0;
  }

}