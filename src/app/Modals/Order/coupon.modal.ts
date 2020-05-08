export class Coupon{
    code: string
    discount: number = 0 //Percentage
    maxDiscount: number // e.g. 20% dis max discount rs.100
    minCartValue: number
    validFrom: string
    validTill: string // Validity date
    description: string
    constructor(){}
    copyDataFromJSON(couponJSON: object){
        this.code = couponJSON['couponCode']
        this.discount = couponJSON['discount']
        this.maxDiscount = couponJSON['maxDiscount']
        this.minCartValue = couponJSON['minCartValue']
        this.validFrom = couponJSON['validFrom']
        this.validTill = couponJSON['validTill']
        this.description = couponJSON['description']
    }
}