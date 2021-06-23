import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-all-faces',
  templateUrl: './all-faces.component.html',
  styleUrls: ['./all-faces.component.scss']
})
export class AllFacesComponent implements OnInit {

  @Input() faceDetections?: faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[];
  @Input() videoRef?: ElementRef;

  constructor() { }
public roundEmotion(emotion: number): number {
  return Math.round(emotion * 100) / 100
}
  ngOnInit(): void {
  }

}
