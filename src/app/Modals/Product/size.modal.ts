export class Size{
    sizeName: string
    availableQuantity: number
    price: number // original price without discount, compute discount price on fly
    discount: number //percent eg: 20% = 20
    readonly dateAdded: string
    dateModified: string
    status: boolean
    constructor(date: string){
        this.dateAdded = date
    }
}