import {Component, OnDestroy, OnInit, ElementRef, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, map, scan, take, takeUntil} from 'rxjs/operators';
import {ScreenRecorderService} from 'src/app/services/screen-recorder.service';
import 'chartjs-adapter-moment';
import * as faceapi from "face-api.js";

@Component({
  selector: 'app-mood-barometer',
  templateUrl: './mood-barometer.component.html',
  styleUrls: ['./mood-barometer.component.scss']
})
export class MoodBarometerComponent implements OnInit, OnDestroy {

  static MOVING_AVERAGE_NUMBER = 10;

  public averageValue$ = this.screenRecorder.faceDetections$.pipe(
    // Calculate score per person
    map((detections) => detections.map((detection) => {
      return (<any>detection).aggregated.positive - (<any>detection).aggregated.negative;
    })),

    // Calculate mean of all people
    map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),

    // Moving values for the next 10 occurences
    scan((acc, curr) => {
      if (!curr) {
        return acc;
      }

      acc.push(curr);

      if (acc.length > MoodBarometerComponent.MOVING_AVERAGE_NUMBER) {
        acc.shift();
      }

      return acc;
    }, []),

    // Calculate moving average
    map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
  );
  // Test StandardDeviation MoodyScore

  private ngUnsubscribe: Subject<boolean> = new Subject()

  constructor(private screenRecorder: ScreenRecorderService,
              private router: Router) {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    if (this.screenRecorder.record$.value.type === 'stop') {
      this.navigateToHome();
      return;
    }
    this.screenRecorder.record$
      .pipe(
        filter(record => record.type === 'stop'),
        takeUntil(this.ngUnsubscribe),
        take(1),
      ).subscribe(this.onFinishRecording.bind(this));
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('');
  }

  private onFinishRecording(): void {
    this.router.navigateByUrl('analytics');
  }

  presenterview(): void {
    this.router.navigateByUrl('presenterview');

  }
  dashboard(): void {
    this.router.navigateByUrl('dashboard');

  }
  public moodyDeviation$ = this.screenRecorder.faceDetections$.pipe(
    map((detections) => detections.map((detection) => {
      return (<any>detection).expressions.happy;
    })),
    map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
    scan((acc, curr) => {
      if (!curr) {
        return acc;
      }

      acc.push(curr);

      if (acc.length > MoodBarometerComponent.MOVING_AVERAGE_NUMBER) {
        acc.shift();
      }

      return acc;
    }, []),

// Calculate moving average
    map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
  );



}
