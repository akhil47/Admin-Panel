import { Subject } from 'rxjs';
import { OnInit } from '@angular/core'

export class SharedComponentService{
    dropdownExpansionControl = new Subject<string>()

    constructor(){

    }
    ngOnInit(){

    }
    
}