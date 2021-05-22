import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-active-emotions',
  templateUrl: './active-emotions.component.html',
  styleUrls: ['./active-emotions.component.scss']
})
export class ActiveEmotionsComponent implements OnInit {

  @Input() faceDetections?: faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[];
  @Input() videoRef?: ElementRef;

  constructor(private screenRecorder: ScreenRecorderService) {
    
  }

  ngOnInit() {
    this.screenRecorder.faceDetections$.subscribe(faceDetections$ => this.faceDetections = faceDetections$)
  }

  public roundEmotion(emotion: number): number {
    return Math.round(emotion * 100) / 100
  }
}
