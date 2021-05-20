import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts'


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
    var options = {
      chart: {},
      series: [
        {
          type: 'timeseries',
          name: 'average mood',
          data: this.mappedValues?.map(v => { return {
            x: v.timestamp,
            y: v.values,
          } }),
          color: '#ffffff',
        }
      ],
      yaxis: {
        min: -1,
        max: 1,
        tickAmount: 11,
        labels: {
          formatter: (v => { return Math.floor(v * 10) / 10 }),
          style: {
            colors: 'white'
          }
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
            minute: 'HH:mm'
          },
          style: {
            colors: 'white'
          }
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        width: 3,
        dashArray: 0,      
      },
      grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: { show: false }
        },
        yaxis: {
          lines: { show: true } 
        },
        row: {
          colors: ['#00bec4', '#00bec4', '#00bec4', '#00bec4', '#00bec4', '#fa6e6e', '#fa6e6e', '#fa6e6e', '#fa6e6e', '#fa6e6e', '#fa6e6e'],
          opacity: 0.5
        }
    }  
    }
    
    const chart = new ApexCharts(this.canvas.nativeElement, options)
    chart.render()

    // this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
    //   type: 'scatter',
    //   data: {
    //     labels: this.values?.map(value => value.timestamp) || [],
    //     datasets: [{
    //       label: 'Moodymeter',
    //       data: this.values?.map(value => value.value) || [],
    //       // fill: false,
    //       borderColor: 'white',
    //       tension: 0.1,
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         min: -1,
    //         max: 1,
    //       },
    //       // x: {
    //       //   type: 'timeseries',
    //       // }
    //     },
    //     plugins: { legend: { display: false } }
    //   }
    // });
  }

}
