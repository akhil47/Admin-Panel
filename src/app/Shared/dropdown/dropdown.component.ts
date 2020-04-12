import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SharedComponentService } from 'src/app/Services/shared-components.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  isItemSelected: boolean = false
  isExpanded: boolean = false

  @Input() dropdownHeader: string
  selectedItem: string = ""

  constructor(private sharedService: SharedComponentService) { }

  ngOnInit() {
    this.selectedItem = this.dropdownHeader
    this.sharedService.dropdownExpansionControl.subscribe(
      (activeDropdown) => {
        if(this.dropdownHeader != activeDropdown) this.isExpanded = false
      })
  }

  toggleMenu(){
    if(this.isExpanded) this.isExpanded = false
    else{
      this.isExpanded = true
      this.sharedService.dropdownExpansionControl.next(this.dropdownHeader)
    }
  }
  itemSelected(item: string){
    this.isItemSelected = true
    this.selectedItem = item
    this.isExpanded = false;
  }
  ngOnDestroy(){
    // this.sharedService.dropdownExpansionControl.unsubscribe()
    // Above call is crashing code when switching between components debug it.
  }
}
