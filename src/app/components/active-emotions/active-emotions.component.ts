import { Component, ElementRef, Input } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-active-emotions',
  templateUrl: './active-emotions.component.html',
  styleUrls: ['./active-emotions.component.scss']
})
export class ActiveEmotionsComponent {

  @Input() faceDetections?: faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[];
  @Input() videoRef?: ElementRef;

  constructor() { }

  public roundEmotion(emotion: number): number {
    return Math.round(emotion * 100) / 100
  }
}
