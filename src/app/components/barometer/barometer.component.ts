import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barometer',
  templateUrl: './barometer.component.html',
  styleUrls: ['./barometer.component.scss']
})
export class BarometerComponent implements OnInit {

  @Input() value?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
