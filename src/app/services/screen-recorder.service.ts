import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, Observable } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { FaceDetectionService } from './face-detection.service';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class ScreenRecorderService {

  public record$: BehaviorSubject<{ type: 'start' | 'stop', videoRef?: ElementRef }> = new BehaviorSubject({ type: 'stop' });

  public faceDetections$?: Observable<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[]> = this.record$.pipe(
    switchMap(e => {
      switch (e.type) {
        case 'start': return this.faceDetection.detectAll(e.videoRef.nativeElement);
        default: return NEVER;
      }
    }),

    share(),
  );

  private videoRef?: ElementRef;

  public active: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private faceDetection: FaceDetectionService) { }

  public registerVideo(videoRef: ElementRef): void {
    this.videoRef = videoRef;
  }

  public async startRecording(): Promise<void> {
    if (!this.videoRef) { return; }

    this.active.next(true);

    this.videoRef.nativeElement.srcObject = await (navigator.mediaDevices as any).getDisplayMedia({
      audio: false,
    });

    this.videoRef.nativeElement
      .srcObject
      .getVideoTracks()[0]
      ?.addEventListener('ended', this.stopRecording.bind(this));

    this.record$.next({ type: 'start', videoRef: this.videoRef });
  }

  public stopRecording(): Promise<void> {
    if (!this.videoRef) { return; }

    this.active.next(false);
    const tracks = this.videoRef.nativeElement.srcObject.getTracks();
    tracks.forEach(track => track.stop());

    this.videoRef.nativeElement.srcObject = null;

    this.record$.next({ type: 'stop', videoRef: this.videoRef });
  }
}
