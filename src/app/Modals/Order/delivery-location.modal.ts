export class DeliveryLocation{
    locationName: string
    pincode: number
    status: string
    constructor(){}
    copyDataFromJSON(deliveryLocationJSON: object){
        this.locationName = deliveryLocationJSON['locationName']
        this.pincode = deliveryLocationJSON['pincode']
        this.status = deliveryLocationJSON['status']
    }
}