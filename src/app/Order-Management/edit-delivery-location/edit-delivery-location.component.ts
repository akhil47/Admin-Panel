import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { DeliveryLocation } from 'src/app/Modals/Order/delivery-location.modal';

@Component({
  selector: 'app-edit-delivery-location',
  templateUrl: './edit-delivery-location.component.html',
  styleUrls: ['./edit-delivery-location.component.css']
})
export class EditDeliveryLocationComponent implements OnInit {

  pincode: number
  editMode: boolean
  editModeDeliveryLocation: DeliveryLocation

  deliveryLocation : FormGroup

  constructor(private route: ActivatedRoute,
    private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.deliveryLocation = new FormGroup({
      locationName: new FormControl(null, [Validators.required]),
      pincode     : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      status      : new FormControl({value: "Active", disabled: false}, [Validators.required])
    })
    this.route.params.subscribe((params)=> {
      if(params['pincode'] != null) this.editMode = true;
      else this.editMode = false;
      this.pincode = +params['pincode']
      if(this.editMode) this.editDeliveryLocation()
    })
  }
  addDeliveryLocation(){
    var newDeliveryLocationJSON = this.deliveryLocation.value
    var newDeliveryLocation = new DeliveryLocation()
    newDeliveryLocation.copyDataFromJSON(newDeliveryLocationJSON)

    this.orderService.addDeliveryLocation(newDeliveryLocation, newDeliveryLocationJSON)
    this.router.navigate(['/delivery-locations/', newDeliveryLocationJSON.pincode])
  }
  saveDeliveryLocation(){
    var updateDeliveryLocationJSON = this.deliveryLocation.value
    var updateDeliveryLocation = new DeliveryLocation()
    updateDeliveryLocation.copyDataFromJSON(updateDeliveryLocationJSON)

    this.orderService.updateDeliveryLocation(updateDeliveryLocation, updateDeliveryLocationJSON)
    this.router.navigate(['/delivery-locations/', updateDeliveryLocation.pincode])
  }
  editDeliveryLocation(){
    this.editModeDeliveryLocation = this.orderService.getDeliveryLocation(this.pincode)
    this.deliveryLocation.setValue({
      locationName: this.editModeDeliveryLocation.locationName,
      pincode : this.editModeDeliveryLocation.pincode,
      status : this.editModeDeliveryLocation.status
    })
  }

}
