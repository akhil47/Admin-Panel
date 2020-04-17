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
    status: boolean
    constructor(){
        this.sizeList = []
    }

    // sizeList property related methods

    getSizeList(){ return this.sizeList }
    setSizeList(sizeList: Size[]){
        this.sizeList = sizeList
    }
    getSizeNamesList(){
        let sizes = []
        for(let size of this.sizeList){
            sizes.push(size.sizeName)
        }
        return sizes
    }
    getSize(size: string): Size{
        for(let s of this.sizeList){
            if(s.sizeName == size) return s
        }
    }
    checkSize(size: string): boolean{
        for(let s of this.sizeList){
            if(s.sizeName == size && s.availableQuantity > 0) return true
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
            sizeString += (size.sizeName + ' ')
        }
        return sizeString
    }
    increaseSizeQuantity(size: string, quantity: number){
        for(let s of this.sizeList){
            if(s.sizeName == size){
                s.availableQuantity += quantity
            }
        }
    }
    decreaseSizeQuantity(size: string, quantity: number){
        for(let s of this.sizeList){
            if(s.sizeName == size){
                s.availableQuantity -= quantity
            }
        }
    }
}