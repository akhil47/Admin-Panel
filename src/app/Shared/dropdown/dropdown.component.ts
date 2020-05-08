import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SharedComponentService } from 'src/app/Services/shared-components.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  isItemSelected: boolean = false
  isExpanded: boolean = false

  @Input() selectedItem: string = ""
  @Input() dropdownHeader: string
  @Input() dropdownList = ['test']
  
  @Output() onItemSelected = new EventEmitter<string>();
  @Output() dropdownOpened = new EventEmitter<boolean>();

  constructor(private sharedService: SharedComponentService) { }

  ngOnInit() {
    this.selectedItem = this.dropdownHeader
    this.sharedService.dropdownExpansionControl.subscribe(
      (activeDropdown) => {
        if(this.dropdownHeader != activeDropdown) this.isExpanded = false
      })
    this.intializeWithPreDefinedSelectedItem()
  }

  toggleMenu(){
    if(this.isExpanded) {
      this.isExpanded = false
      this.dropdownOpened.emit(true)
    }
    else{
      this.isExpanded = true
      this.sharedService.dropdownExpansionControl.next(this.dropdownHeader)
    }
  }
  itemSelected(item: string){
    this.isItemSelected = true
    this.selectedItem = item
    this.isExpanded = false;
    this.onItemSelected.emit(item)
  }
  intializeWithPreDefinedSelectedItem(){
    if(this.selectedItem != "" && this.dropdownList.includes(this.selectedItem)){
      this.isItemSelected = true
      this.isExpanded = false;
    }
  }
  ngOnDestroy(){
    // this.sharedService.dropdownExpansionControl.unsubscribe()
    // Above call is crashing code when switching between components debug it.
  }
}
