import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, TimeScale, TimeSeriesScale,  } from 'chart.js';
import * as faceapi from 'face-api.js';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-emotion-rollercoaster',
  templateUrl: './emotion-rollercoaster.component.html',
  styleUrls: ['./emotion-rollercoaster.component.scss']
})
export class EmotionRollercoasterComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() faceDetections?: Observable<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[]>;

  public chart?: Chart;

  constructor() {
    Chart.register(LinearScale, LineElement, LineController, PointElement, CategoryScale, TimeSeriesScale, TimeScale, Legend)
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        datasets: [{
          label: 'Angry',
          data: [],
          borderColor: 'red',
          backgroundColor: 'red',
        }, {
          label: 'Disgusted',
          data: [],
          borderColor: 'brown',
          backgroundColor: 'brown',
        }, {
          label: 'Happy',
          data: [],
          borderColor: 'green',
          backgroundColor: 'green',
        }, {
          label: 'Fearful',
          data: [],
          borderColor: 'yellow',
          backgroundColor: 'yellow',
        }, {
          label: 'Neutral',
          data: [],
          borderColor: 'blue',
          backgroundColor: 'blue',
        }, {
          label: 'Sad',
          data: [],
          borderColor: 'black',
          backgroundColor: 'black',
        }, {
          label: 'Surprised',
          data: [],
          borderColor: 'orange',
          backgroundColor: 'orange',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            type: 'linear',
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      }
    });

    this.faceDetections?.subscribe((detection) => this.addEmotions(detection));
  }

  public addEmotions(emotions: faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[]) {
    const data = this.chart.data;
    if (!data.labels) { data.labels = []; }
    data.labels.push(data.labels.length || 0);

    const detections = [[], [],  [], [], [], [], []];

    emotions.forEach((person) => {
      detections[0].push(person.expressions.angry);
      detections[1].push(person.expressions.disgusted);
      detections[2].push(person.expressions.happy);
      detections[3].push(person.expressions.fearful);
      detections[4].push(person.expressions.neutral);
      detections[5].push(person.expressions.sad);
      detections[6].push(person.expressions.surprised);
    });

    detections.forEach((emotions, index) => {
      let sum = 0;
      emotions.forEach((emotion) => { sum += emotion });
      data.datasets[index].data.push(sum / emotions.length);
    });


    this.chart.update();
  }

}
