import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  isItemSelected: boolean = false
  isExpanded: boolean = false
  @Input() selectedItem: string = 'Select Brand'

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    if(this.isExpanded) this.isExpanded =false
    else this.isExpanded = true
  }
  itemSelected(item: string){
    this.isItemSelected = true
    this.selectedItem = item
    this.isExpanded = false;
  }
}
