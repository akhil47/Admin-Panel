import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/Services/product.service'
import { Product } from 'src/app/Modals/Product/product.modal';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  product: Product

  constructor(private router: Router, private productService: ProductService) {
    
  }

  ngOnInit() {
    this.product = this.productService.getProductByID('29785666')
    console.log(this.product)
  }

  onEditDetails(){
    this.router.navigate(['/product/' + this.product['id'] + '/edit'])
    // Product Edit page must fetch product object from a service based on product 'id' in URL
  }
  returnZero(){
    return 0;
  }

}