import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableScrollContainerRowData } from 'src/app/Modals/table-scroll-container-row-data.modal';

@Component({
  selector: 'app-table-scroll-container',
  templateUrl: './table-scroll-container.component.html',
  styleUrls: ['./table-scroll-container.component.css']
})
export class TableScrollContainerComponent implements OnInit {

  @Input() headerText: string
  @Input() columnHeaders: string[]
  @Input() tableData: Array<TableScrollContainerRowData>
  @Input() baseLink: string

  columnWidth: string

  constructor(private router: Router) { }

  ngOnInit() {
    this.columnWidth = 100 / this.columnHeaders.length + '%'
  }
  openLink(row: TableScrollContainerRowData){
    this.router.navigate([this.baseLink, row.rowLink])
  }
  
}
