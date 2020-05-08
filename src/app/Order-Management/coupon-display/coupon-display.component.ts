import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/Modals/Order/coupon.modal';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-coupon-display',
  templateUrl: './coupon-display.component.html',
  styleUrls: ['./coupon-display.component.css']
})
export class CouponDisplayComponent implements OnInit {

  coupon: Coupon

  constructor(private router: Router, 
    private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.coupon = this.orderService.getCoupon(params['id'])
    })
  }
  onEditCoupon(){
    this.router.navigate(['/coupon/' + this.coupon.code + '/edit'])
  }


}
