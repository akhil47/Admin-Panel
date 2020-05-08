import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/Services/order.service';
import { Coupon } from 'src/app/Modals/Order/coupon.modal';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.css']
})
export class CouponEditComponent implements OnInit {

  editMode: boolean
  couponID: string

  couponForm: FormGroup

  constructor(private route: ActivatedRoute, 
    private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.couponForm = new FormGroup({
      couponCode  : new FormControl(null, [Validators.required]),
      discount    : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      maxDiscount : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      minCartValue: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      validFrom   : new FormControl(null, [Validators.required]),
      validTill   : new FormControl(null, [Validators.required]),
      description : new FormControl(null, [Validators.required]),
    })
    this.route.params.subscribe((params: Params)=>{
      if(params['id'] != null) this.editMode = true;
      else this.editMode = false;
      this.couponID = params['id']
      if(this.editMode) this.editCoupon()
    })
  }
  onAddCoupon(){
    var newCouponJSON = this.couponForm.value
    var newCoupon = new Coupon()
    newCoupon.copyDataFromJSON(newCouponJSON)

    this.orderService.addCoupon(newCoupon, newCouponJSON)
    this.router.navigate(['/coupon/', newCoupon.code])
  }
  onSaveCoupon(){
    var updatedCouponJSON = this.couponForm.value
    var updatedCoupon = new Coupon()
    updatedCoupon.copyDataFromJSON(updatedCouponJSON)

    this.orderService.updateCoupon(updatedCoupon, updatedCouponJSON)
    this.router.navigate(['/coupon/', this.couponID])
  }
  editCoupon(){
    var coupon: Coupon = this.orderService.getCoupon(this.couponID)
    this.couponForm.setValue(
      {
        couponCode: coupon.code,
        discount: coupon.discount,
        maxDiscount: coupon.maxDiscount,
        minCartValue: coupon.minCartValue,
        validFrom: coupon.validFrom,
        validTill: coupon.validTill,
        description: coupon.description
      }
    )
  }
  
}
