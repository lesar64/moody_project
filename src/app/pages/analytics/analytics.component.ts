import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceDetectionService } from 'src/app/services/face-detection.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  public get averageValue(): number | undefined {
    if (!this.faceDetection.detections?.length) { return undefined; }

    const average = this.faceDetection.detections
              ?.map(value => value.value)
              .reduce((acc, current) => acc + current, 0) / this.faceDetection.detections?.length

    return Math.round(average * 100) / 100;
  }

  public get avgGroupFlow(): number | undefined {
    if (!this.dashboard.groupFlow?.length) { return undefined; }

    const average = this.dashboard.groupFlow
              ?.map(value => value.value)
              .reduce((acc, current) => acc + current, 0) / this.dashboard.groupFlow?.length

    return Math.round(average * 100) / 100;
  }

  public get avgPeak(): number | undefined {
    if (!this.dashboard.peak?.length) { return undefined; }

    const average = this.dashboard.peak
              ?.map(value => value.value)
              .reduce((acc, current) => acc + current, 0) / this.dashboard.peak?.length

    return Math.round(average * 100) / 100;
  }

  public get avgHappy(): number | undefined {
    if (!this.dashboard.happy?.length) { return undefined; }

    const average = this.dashboard.happy
              ?.map(value => value.value)
              .reduce((acc, current) => acc + current, 0) / this.dashboard.peak?.length

    return Math.round(average * 100) / 100;
  }

  constructor(public faceDetection: FaceDetectionService,
              public dashboard: DashboardService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.faceDetection.detections?.length) {
      this.navigateToHome();
    }
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('');
  }

  public get getDat(): number | undefined {
    if (!this.faceDetection.detections?.length) { return undefined; }

    const fileToSave = new Blob([JSON.stringify(this.faceDetection.detections)], {
      type: 'json',
    });

    const time = new Date();
    fileSaver.saveAs(fileToSave, `moody_${time.toLocaleDateString().split('/').join('-')}_${time.getHours()}-${time.getMinutes()}.json`);
  }

}
