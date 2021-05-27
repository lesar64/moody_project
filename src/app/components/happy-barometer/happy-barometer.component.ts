import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-happy-barometer',
  templateUrl: './happy-barometer.component.html',
  styleUrls: ['./happy-barometer.component.scss']
})
export class HappyBarometerComponent implements OnInit {

  gaugeType: 'semi';
  gaugeValue = 28;
  gaugeLabel: 'Speed';
  gaugeAppendText: 'km/hr';
  backgroundColor: 'white';
  foregroundColor: 'rgba(255, 255, 255, 0.3)';

  thresholdConfig = {
    0: {color: 'green'},
    40: {color: 'orange'},
    75.5: {color: 'red'}
  };

  constructor() {}
  ngOnInit(): void {
  }


}
