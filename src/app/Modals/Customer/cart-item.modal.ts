export class CartItem{
    productId: number
    size: string
    quantity: number
    price: number //total price when quantity is more than one
    discount: number
    status: string // Used to indicate product delivery status after placing order
    constructor(){}
}