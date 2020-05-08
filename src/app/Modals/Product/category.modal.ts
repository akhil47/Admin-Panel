export class Category{
    name: string
    status: string
    subCategories: string[]
    constructor(){
    }
    copyDataFromJSON(categoryJSON: object){
        this.name = categoryJSON['name']
        this.status = categoryJSON['status']
        this.subCategories = []
        for(var sub in categoryJSON['subCategories']){
            this.subCategories.push(categoryJSON['subCategories'][sub])
        }
    }
}