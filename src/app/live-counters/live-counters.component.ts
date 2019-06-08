import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-counters',
  templateUrl: './live-counters.component.html',
  styleUrls: ['./live-counters.component.css']
})
export class LiveCountersComponent implements OnInit {

  counter_1_number: string = '5072'
  counter_2_number: string = '448'
  counter_3_number: string = '69'
  counter_4_number: string = '230K'

  constructor() { }

  ngOnInit() {
  }

}
