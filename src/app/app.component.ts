import { Component, ElementRef } from '@angular/core';
import { NEVER, Observable, Subject } from 'rxjs';
import { FaceDetectionService } from './services/face-detection.service';
import * as faceapi from 'face-api.js';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'COINs –  Live Emotion Detection';

  public recordChange$: Subject<{ type: 'start' | 'stop', videoRef: ElementRef }> = new Subject();
  public faceDetections$?: Observable<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[]> = this.recordChange$.pipe(
    switchMap(e => {
      switch (e.type) {
        case 'start': return this.faceDetection.detectAll(e.videoRef.nativeElement);
        default: return NEVER
      }
    })
  );

  constructor(private faceDetection: FaceDetectionService) {}

  public onScreenRecordChange(event: { type: 'start' | 'stop', videoRef: ElementRef }): void {
    this.recordChange$.next(event);
  }
}
