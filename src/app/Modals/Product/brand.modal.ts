export class Brand{
    name: string
    image: string
    status: string
    constructor(){}

    copyDataFromJSON(brandJSON: object){
        this.name      = brandJSON['name']
        this.image     = brandJSON['image']
        this.status    = brandJSON['status']
    }
}