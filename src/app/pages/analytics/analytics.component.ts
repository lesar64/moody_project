import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceDetectionService } from 'src/app/services/face-detection.service';

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

  constructor(public faceDetection: FaceDetectionService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.faceDetection.detections?.length) {
      this.navigateToHome();
    }
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('');
  }

}
