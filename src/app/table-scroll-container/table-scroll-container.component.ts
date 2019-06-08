import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-table-scroll-container',
  templateUrl: './table-scroll-container.component.html',
  styleUrls: ['./table-scroll-container.component.css']
})
export class TableScrollContainerComponent implements OnInit {

  @Input() headerText: string
  @Input() columnHeaders: string[]

  columnWidth: string

  constructor() { }

  ngOnInit() {
    this.columnWidth = 100 / this.columnHeaders.length + '%'
  }
}
