 import { OrderTimeline } from './order-timeline.modal';
import { Address } from '../Customer/address.modal';
import { Cart } from '../Customer/cart.modal';

export class Order{
    id: number
    customerId: string
    timeline: OrderTimeline
    address: Address
    pinCode: string
    orderDetails: Cart
    paymentMode: string
    paymentStatus: string
    orderStatus: string
    constructor(){}
}