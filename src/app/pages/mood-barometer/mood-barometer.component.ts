import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-mood-barometer',
  templateUrl: './mood-barometer.component.html',
  styleUrls: ['./mood-barometer.component.scss']
})
export class MoodBarometerComponent implements OnInit {

  public averageValue$ = this.screenRecorder.faceDetections$.pipe(
    // Calculate score per person
    map((detections) => detections.map((detection) => {
      return (<any>detection).aggregated.positive - (<any>detection).aggregated.negative;
    })),
    // Calculate mean
    map((scores) => {
      let sum = 0;
      (<number[]>scores).forEach(score => {
        sum += score;
      });
      return sum / (<number[]>scores).length;
    }),
  );

  constructor(private screenRecorder: ScreenRecorderService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.screenRecorder.record$.value.type === 'stop') {
      this.router.navigateByUrl('');
    }
  }

}
