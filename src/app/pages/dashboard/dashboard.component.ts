import { Component, OnInit } from '@angular/core';
import { filter, map, scan, take, takeUntil } from 'rxjs/operators';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private screenRecorder: ScreenRecorderService) { }

  public groupFlow$ = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.happy)
    })),

    // Calculate mean of all people
    map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),

    // Moving values for the next 10 occurences
    scan((acc, curr) => {
      if (!curr) { return acc; }

      acc.push(curr);

      if (acc.length > 10) {
        acc.shift();
      }

      return acc;
    }, []),

  ).subscribe()

  ngOnInit(): void {
    console.log("Dashboard geladen")
  }

}
