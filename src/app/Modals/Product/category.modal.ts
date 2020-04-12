export class Category{
    name: string
    subCategories: string[]
    constructor(name: string, subCategories: string[]){
        this.name = name
        this.subCategories = subCategories
    }
}