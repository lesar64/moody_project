import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts'
import { chartSettings } from './chart-settings';


@Component({
  selector: 'app-emotion-rollercoaster',
  templateUrl: './emotion-rollercoaster.component.html',
  styleUrls: ['./emotion-rollercoaster.component.scss']
})
export class EmotionRollercoasterComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() values: { timestamp: number, value: number }[] = [];

  public MAX_CANDLESTICKS = 50;

  public get mappedValues(): { timestamp: number, values: number[] }[] {
    const mapped: { timestamp: number, values: number[] }[] = [];
    const steps = Math.floor(this.values.length / this.MAX_CANDLESTICKS);

    for (let i = 0; i < this.values.length; i += steps) {
      mapped.push({
        timestamp: this.values[i].timestamp,
        values: this.values.slice(i, i + steps).map(v => v.value),
      });
    }

    return mapped;
  }

  constructor() { }

  ngAfterViewInit(): void {
    const options = chartSettings(this.mappedValues);
    const chart = new ApexCharts(this.canvas.nativeElement, options);
    chart.render();
  }

}
