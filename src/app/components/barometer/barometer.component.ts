import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barometer',
  templateUrl: './barometer.component.html',
  styleUrls: ['./barometer.component.scss']
})
export class BarometerComponent implements OnInit {

  @Input() value?: number;

  public get roundedValue(): number | undefined {
    if (!this.value) { return this.value; }

    return Math.round(this.value * 100) / 100;
  }

  public get sadWidth(): string {
    if (!!this.value && this.value < 0) {
      return `${(0 - this.value) / 2 * 100}%`;
    }
    return '50%';
  }

  public get happyWidth(): string {
    if (!!this.value && this.value > 0) {
      return `${this.value / 2 * 100}%`;
    }
    return '50%';
  }


  constructor() { }

  ngOnInit(): void {
  }

}
