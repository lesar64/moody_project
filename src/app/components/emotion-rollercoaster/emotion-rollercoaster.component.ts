import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, TimeScale, TimeSeriesScale } from 'chart.js';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-emotion-rollercoaster',
  templateUrl: './emotion-rollercoaster.component.html',
  styleUrls: ['./emotion-rollercoaster.component.scss']
})
export class EmotionRollercoasterComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() values: { timestamp: number, value: number }[] = [];
  public chart?: Chart;

  constructor() {
    Chart.register(LinearScale, LineElement, LineController, PointElement, CategoryScale, TimeSeriesScale, TimeScale, Legend)
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.values?.map(value => value.timestamp) || [],
        datasets: [{
          label: 'Angry',
          data: this.values?.map(value => value.value) || [],
          fill: false,
          borderColor: 'white',
          tension: 0.1,
        }]
      },
      options: {
        scales: {
          y: {
            min: -1,
            max: 1,
          },
          x: {
            type: 'timeseries',
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

}
