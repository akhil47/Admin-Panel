import { Component, OnInit } from '@angular/core';
import { DeliveryLocation } from 'src/app/Modals/Order/delivery-location.modal';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-delivery-location-display',
  templateUrl: './delivery-location-display.component.html',
  styleUrls: ['./delivery-location-display.component.css']
})
export class DeliveryLocationDisplayComponent implements OnInit {

  deliveryLocation: DeliveryLocation

  constructor(private route: ActivatedRoute,
    private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.deliveryLocation = this.orderService.getDeliveryLocation(+params['pincode'])
    })
  }
  editDeliveryLocation(){
    this.router.navigate(['/delivery-locations/', this.deliveryLocation.pincode, 'edit'])
  }

}
