import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-mood-barometer',
  templateUrl: './mood-barometer.component.html',
  styleUrls: ['./mood-barometer.component.scss']
})
export class MoodBarometerComponent implements OnInit, OnDestroy {

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

  private ngUnsubscribe: Subject<boolean> = new Subject()

  constructor(private screenRecorder: ScreenRecorderService,
              private router: Router) { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.screenRecorder.record$
      .pipe(
        filter(record => record.type === 'stop'),
        takeUntil(this.ngUnsubscribe),
        take(1),
      ).subscribe(this.onFinishRecording.bind(this));
  }

  private onFinishRecording(): void {
    this.router.navigateByUrl('analytics');
  }

}
