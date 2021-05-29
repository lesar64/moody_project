import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';
import {filter, map, scan, take, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-presenterview',
  templateUrl: './presenterview.component.html',
  styleUrls: ['./presenterview.component.scss']
})
export class PresenterviewComponent implements OnInit {

  static MOVING_AVERAGE_NUMBER = 10;
  private happyness: number;

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


  public averageHappiness$ = this.screenRecorder.faceDetections$.pipe(
    map((detections) => detections.map((detection) => {
      return (<any>detection).expressions.happy;
    })),
    map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
    scan((acc, curr) => {
      if (!curr) {
        return acc;
      }

      acc.push(curr);

      if (acc.length > Presenterview.MOVING_AVERAGE_NUMBER) {
        acc.shift();
      }

      return acc;
    }, []),

// Calculate moving average
    map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
    tap((value) => {
      this.happyness = value;
      this.setWarningtext();
    })
  );

  public warningText = "Hallo";
  public warningColor = "darkgrey";

  public setWarningtext() {

    if (this.happyness > 0.7) {
      this.warningText = "Very nice meeting";
      this.warningColor="green";
    } else if (this.happyness <= 0.3) {
      this.warningColor="green";
    } else if (this.happyness > 0.3 && this.happyness < 0.7) {
      this.warningColor="darkgrey";
    }
  }
}
