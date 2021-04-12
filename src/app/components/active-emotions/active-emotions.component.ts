import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-emotions',
  templateUrl: './active-emotions.component.html',
  styleUrls: ['./active-emotions.component.scss']
})
export class ActiveEmotionsComponent {

  @Input() faceDetections: any[];

  constructor() { }

  public roundEmotion(emotion: number): number {
    return Math.round(emotion * 100) / 100
  }
}
