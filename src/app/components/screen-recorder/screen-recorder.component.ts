import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceDetectionService } from '../../services/face-detection.service';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss']
})
export class ScreenRecorderComponent implements OnInit {

  @ViewChild('videoref') videoRef: ElementRef;

  public readonly Math = Math;
  public sharing: boolean = false;
  public faceDetections$?: Observable<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[]>;

  constructor(private faceDetection: FaceDetectionService) {}

  ngOnInit(): void { }

  public async startRecording(): Promise<void> {
    this.videoRef.nativeElement.srcObject = await (<any>navigator.mediaDevices).getDisplayMedia({
      audio: false,
    });

    if (!this.faceDetections$) {
      this.faceDetections$ = this.faceDetection.detectAll(this.videoRef.nativeElement);
    }

    this.sharing = true;
  }

  public stopRecording(): void {
    const tracks = this.videoRef.nativeElement.srcObject.getTracks();
    tracks.forEach(track => track.stop());

    this.videoRef.nativeElement.srcObject = null;
    this.sharing = false;
  }

}
