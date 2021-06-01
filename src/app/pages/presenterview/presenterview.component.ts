import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { filter, map, scan, take, takeUntil, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-presenterview',
  templateUrl: './presenterview.component.html',
  styleUrls: ['./presenterview.component.scss']
})
export class PresenterviewComponent implements OnInit {

  private ngUnsubscribe: Subject<boolean> = new Subject()

  constructor(private screenRecorder: ScreenRecorderService,
    private dashboard: DashboardService,
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
        take(1),
      ).subscribe(this.onFinishRecording.bind(this));
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('');
  }

  private onFinishRecording(): void {
    this.router.navigateByUrl('analytics');
  }

  public groupFlowIndicator$ = this.dashboard.groupFlowIndicator$.subscribe(
    ([mean_happy, std_happy, mean_surprised, std_surprised,
    mean_neutral, std_neutral, mean_sad, std_sad,
    mean_angry, std_angry, mean_fearful, std_fearful,
    mean_disgusted, std_disgusted]) => {
      let gF = ((1 - std_happy) * mean_happy) + ((1 - std_surprised) * mean_surprised) +
        ((1 - std_neutral) * mean_neutral) + ((1 - std_sad) * mean_sad) +
        ((1 - std_angry) * mean_angry) + ((1 - std_fearful) * mean_fearful) +
        ((1 - std_disgusted) * mean_disgusted)
      this.groupflowIndicator = Math.round(gF * 100) / 100;
      // console.log("Value of the groupflow indicator: " + this.groupflowIndicator)
    }
  )

  public groupflowIndicator?: number;

  public peakIndicator$ = this.dashboard.peakIndicator$.subscribe(
    ([moving_std_happy, moving_std_surprised,
    moving_std_neutral, moving_std_sad,
    moving_std_angry, moving_std_fearful,
    moving_std_disgusted]) => {
      let p = moving_std_happy + moving_std_surprised +
        moving_std_neutral + moving_std_sad +
        moving_std_angry + moving_std_fearful +
        moving_std_disgusted;
      let max_norm = 1
      let min_norm = 0
      let max = 1.5
      let min = 0
      let peakIndicator = (p - min) * ((max_norm - min_norm) / (max - min)) + min_norm

      this.peakIndicator = Math.round(peakIndicator * 100) / 100;
      // console.log("Value of the peak Indicator: " + this.peakIndicator)
    })

  public peakIndicator?: number;

  private mean_happiness$ = this.dashboard.mean_happy.subscribe(
    (value) => {
      this.happiness = value;
      // console.log("Value of the Happiness: " + value)
      this.setWarningtext();
    }
  )

  public happiness?: number;

//   static MOVING_AVERAGE_NUMBER = 10;

//   public averageHappiness$ = this.screenRecorder.faceDetections$.pipe(
//     map((detections) => detections.map((detection) => {
//       return (<any>detection).expressions.happy;
//     })),
//     map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
//     scan((acc, curr) => {
//       if (!curr) {
//         return acc;
//       }

//       acc.push(curr);

//       if (acc.length > PresenterviewComponent.MOVING_AVERAGE_NUMBER) {
//         acc.shift();
//       }

//       return acc;
//     }, []),

// // Calculate moving average
//     map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
//     tap((value) => {
//       this.happyness = value;
//       this.setWarningtext();
//     })
//   );

  // private standardDeviation: number = 0.4;
  // private groupflow: number =0.09;

  public warningText = "Hello";

  public warningColor = "darkgrey";

  public setWarningtext() {
    if (this.peakIndicator <= 0.25 ) {
      this.warningText = "It seems you lost your audience. Surprise them!";
      this.warningColor="darkred";
    } else {
      if (this.groupflowIndicator <= 0.50) {
        this.warningText = "Your audience is not on the same page. Repeat your explanations!";
        this.warningColor="darkred";
      } else {
        if (this.happiness <= 0.01) {
          this.warningText = "The mood reached the bottom line. Cheer up your audience!";
          this.warningColor="darkred";
        }else{
          if (this.peakIndicator <= 0.33 ) {
            this.warningText = "Your meeting seems to get boring. Try to be more emotional!";
            this.warningColor="orange";
          } else {
            if (this.groupflowIndicator <= 0.67) {
              this.warningText = "It seems your audience is not on the same level. Maybe ask for ambiguities? ";
              this.warningColor="orange";
            } else {
              if (this.happiness <= 0.04) {
                this.warningText = "The mood seems to decrease. Try to smile more! ";
                this.warningColor="orange";
              }else{
                this.warningText = "Your doing a great job. Keep going!";
                this.warningColor="darkgrey"
              }
              }
            }
        }
      }
    }
  }
}
