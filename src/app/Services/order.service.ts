import { OnInit } from '@angular/core'
import { Coupon } from '../Modals/Order/coupon.modal'
import { Order } from '../Modals/Order/order.modal'
import { DeliveryLocation } from '../Modals/Order/delivery-location.modal'

export class OrderService{
    coupons = {}
    deliveryLocations = {}
    constructor(){}
    ngOnInit(): void{
    }
    init(){
        var c1 = new Coupon()
        c1.code = 'DC50'
        c1.discount = 20
        c1.maxDiscount = 500
        c1.minCartValue = 1000
        c1.validFrom = '02-05-2020'
        c1.validTill = '02-06-2020'
        c1.description = 'Flat 20% Discount on all DC products'
        this.coupons[c1.code] = c1
    }
    getDeliveryLocation(pincode: number){
        if(pincode in this.deliveryLocations)
            return this.deliveryLocations[pincode]
    }
    addDeliveryLocation(deliveryLocation: DeliveryLocation, deliveryLocationJSON: object){
        this.deliveryLocations[deliveryLocation.pincode] = deliveryLocation
        // Write code to update in database
    }
    updateDeliveryLocation(deliveryLocation: DeliveryLocation, deliveryLocationJSON: object){
        this.deliveryLocations[deliveryLocation.pincode] = deliveryLocation
        // Write code to update in database
    }
    searchDeliveryLocations(choice: string, searchText: string){
        var matchingLocations = []
        if(choice == "pincode"){
            var pincodeResult = this.getDeliveryLocation(+searchText)
            if(pincodeResult != undefined) matchingLocations.push(pincodeResult)
        }
        else{
            var p = new RegExp(searchText)
            for(let loc of Object.keys(this.deliveryLocations)){
                var result = this.deliveryLocations[loc].locationName.match(p)
                if(result != null){
                    // 'input' is property of match() returned object
                    matchingLocations.push(this.deliveryLocations[loc])
                }
            }
        }
        return matchingLocations
    }
    addCoupon(coupon: Coupon, couponJSON: object){
        // Adding Locally
        this.coupons[coupon.code] = coupon

        // Write code to add in database

    }
    updateCoupon(coupon: Coupon, couponJSON: object){
        // Updating Locally
        this.coupons[coupon.code] = coupon

        // Write code to update in database
    }
    getCoupon(code: string){
        this.init()
        return this.coupons[code]
    }

    searchCoupons(params): Array<Coupon>{
        this.init()
        var matchingResults = []
        // Local search
        if(params.code!= null){
            if((params.code in this.coupons))
                matchingResults.push(this.coupons[params.code])
        } 
        else{
            for(let key of Object.keys(this.coupons)) matchingResults.push(this.coupons[key])
            matchingResults = this.searchCouponByDiscount(params.discount, matchingResults)
            matchingResults = this.searchCouponByMaxDiscount(params.maxDiscount, matchingResults)
            matchingResults = this.searchCouponByMinCartValue(params.minCartValue, matchingResults)
            matchingResults = this.searchCouponByValidFrom(params.validFrom, matchingResults)
            matchingResults = this.searchCouponByValidTill(params.validTill, matchingResults)
        }

        return matchingResults
    }
    searchCouponByValidFrom(validFrom: string, coupons: Array<Coupon>): Array<Coupon>{
        if(validFrom == '' || validFrom == null) return coupons
        var matchingResults = []
        for(let coupon of coupons){
            if(coupon.validFrom == validFrom) matchingResults.push(coupon)
        }
        return matchingResults
    }
    searchCouponByValidTill(validTill: string, coupons: Array<Coupon>): Array<Coupon>{
        if(validTill == '' || validTill == null) return coupons
        var matchingResults = []
        for(let coupon of coupons){
            if(coupon.validTill == validTill) matchingResults.push(coupon)
        }
        return matchingResults
    }
    searchCouponByDiscount(discount: number, coupons: Array<Coupon>): Array<Coupon>{
        if(discount == null) return coupons
        var matchingResults = []
        for(let coupon of coupons){
            if(coupon.discount == discount) matchingResults.push(coupon)
        }
        return matchingResults
    }
    searchCouponByMinCartValue(minCartValue: number, coupons: Array<Coupon>): Array<Coupon>{
        if(minCartValue == null) return coupons
        var matchingResults = []
        for(let coupon of coupons){
            if(coupon.minCartValue == minCartValue) matchingResults.push(coupon)
        }
        return matchingResults
    }
    searchCouponByMaxDiscount(maxDiscount: number, coupons: Array<Coupon>): Array<Coupon>{
        if(maxDiscount == null) return coupons
        var matchingResults = []
        for(let coupon of coupons){
            if(coupon.maxDiscount == maxDiscount) matchingResults.push(coupon)
        }
        return matchingResults
    }

    searchOrders(): Array<Order>{
        return []
    }
}