export class Coupon{
    code: string
    description: string
    discount: number = 0 //Percentage
    maxDiscountAmount: number // e.g. 20% dis max discount rs.100
    validTill: string // Validity date
    constructor(){}
}