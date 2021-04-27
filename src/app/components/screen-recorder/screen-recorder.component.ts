import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss']
})
export class ScreenRecorderComponent {

  @ViewChild('videoref') videoRef: ElementRef;

  constructor(private screenRecorder: ScreenRecorderService) {}

  ngAfterViewInit() {
    this.screenRecorder.registerVideo(this.videoRef);
  }
}
