import { Size } from './size.modal';

export class Product{
    name: string
    id: string
    description: string
    images: string[]
    brand: string
    genderGroup: string
    category: string
    subCategory: string
    private sizeList: Size[]
    status: string
    constructor(){
        this.sizeList = []
    }
    copyDataFromJSON(product){
        if ('_id' in product)this.id = product['_id']
        
        this.name           = product['name']
        this.description    = product['description']
        this.images         = product['images']
        this.genderGroup    = product['genderGroup']
        this.brand          = product['brand']
        this.category       = product['category']
        this.subCategory    = product['subCategory']
        this.status         = product['status']
        for(let size of product['sizeList']){
            var s = new Size()
            s.copyDataFromJSON(size)
            this.sizeList.push(s)
        }
    }
    // sizeList property related methods

    getSizeList(){ return this.sizeList }
    setSizeList(sizeList: Size[]){
        this.sizeList = sizeList
    }
    getSizeNamesList(){
        let sizes = []
        for(let size of this.sizeList){
            sizes.push(size.name)
        }
        return sizes
    }
    getSize(size: string): Size{
        for(let s of this.sizeList){
            if(s.name == size) return s
        }
    }
    checkSize(size: string): boolean{
        for(let s of this.sizeList){
            if(s.name == size && s.quantity > 0) return true
        }
        return false
    }
    checkPrice(minPrice: number, maxPrice: number): boolean{
        for(let s of this.sizeList){
            if(minPrice <= s.price && s.price >= maxPrice) return true
        }
        return false
    }
    sizesToString(){
        var sizeString: string = ''
        for(let size of this.sizeList){
            sizeString += (size.name + ' ')
        }
        return sizeString
    }
    increaseSizeQuantity(size: string, quantity: number){
        for(let s of this.sizeList){
            if(s.name == size){
                s.quantity += quantity
            }
        }
    }
    decreaseSizeQuantity(size: string, quantity: number){
        for(let s of this.sizeList){
            if(s.name == size){
                s.quantity -= quantity
            }
        }
    }
}