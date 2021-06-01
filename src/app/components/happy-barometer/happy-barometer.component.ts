import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-happy-barometer',
  templateUrl: './happy-barometer.component.html',
  styleUrls: ['./happy-barometer.component.scss']
})
export class HappyBarometerComponent implements OnInit {

  @Input() label?: string;
  @Input() value?: number;
  @Input() orangeThreshold?: number;
  @Input() greenThreshold?: number;
  thresholdConfig = {};


  public get roundedValue(): number | undefined {
    if (!this.value) { return this.value; }
    // console.log(this.value);
    return Math.round(this.value * 100);
  }

  // thresholdConfig = {
  //   0: {color: 'red'},
  //   orangeThreshold: {color: 'orange'},
  //   greenThreshold: {color: 'green'}
  // };

  constructor() {}

  ngOnInit(): void {
    this.thresholdConfig = {
      0: {color: 'red'},
      [this.orangeThreshold]: {color: 'orange'},
      [this.greenThreshold]: {color: 'green'}
    };
  }
}
