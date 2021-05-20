import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, first, map, scan, takeUntil, tap } from 'rxjs/operators';
import { mapIndividualScore, scanMovingAverage } from 'src/app/services/helper.functions';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';
import { mean, std } from 'mathjs';

@Component({
  selector: 'app-mood-barometer',
  templateUrl: './mood-barometer.component.html',
  styleUrls: ['./mood-barometer.component.scss']
})
export class MoodBarometerComponent implements OnInit, OnDestroy {

  public averageValue$ = this.screenRecorder.faceDetections$.pipe(
    // Calculate score per person
    map((detections) => detections.map(mapIndividualScore)),
    // Calculate mean of all people
    map(v => mean(v)),
    // Moving values for the next 10 occurences
    scan(scanMovingAverage(10), []),
    // Calculate moving average
    map(v =>  mean(v)),
  );

  public standardDeviation$ = this.screenRecorder.faceDetections$.pipe(
    // Calculate score per person
    map((detections) => detections.map(mapIndividualScore)),
    filter(d => !!d?.length),
    // Calculate standard deviation of all people
    map(v => std(v)),
    tap((sd) => console.log("SD", sd)),
    // Moving values for the next 10 occurences
    scan(scanMovingAverage(10), []),
    tap((s) => console.log("MA", s)),
    // // Calculate moving average
    map(v => mean(v)),
  );

  private ngUnsubscribe: Subject<boolean> = new Subject()

  constructor(private screenRecorder: ScreenRecorderService,
              private router: Router) { }

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
      first(),
    ).subscribe(this.onFinishRecording.bind(this));
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('');
  }

  private onFinishRecording(): void {
    this.router.navigateByUrl('analytics');
  }

}
