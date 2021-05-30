import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-happy-barometer',
  templateUrl: './happy-barometer.component.html',
  styleUrls: ['./happy-barometer.component.scss']
})
export class HappyBarometerComponent implements OnInit {

  @Input() label?: string;
  @Input() value?: number;

  public get roundedValue(): number | undefined {
    if (!this.value) { return this.value; }
    // console.log(this.value);
    return Math.round(this.value * 100);
  }

  thresholdConfig = {
    0: {color: 'red'},
    40: {color: 'orange'},
    75.5: {color: 'green'}
  };

  constructor() {}
  
  ngOnInit(): void {
  }
}
