export class Size{
    name: string
    quantity: number
    price: number // original price without discount, compute discount price on fly
    discount: number //percent eg: 20% = 20
    status: string
    constructor(){
    }
    copyDataFromJSON(size){
        this.name       = size['name']
        this.quantity   = size['quantity']
        this.price      = size['price']
        this.discount   = size['discount']
        this.status     = size['status']
    }
}