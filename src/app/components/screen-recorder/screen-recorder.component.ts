import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss']
})
export class ScreenRecorderComponent implements OnInit {

  @ViewChild('video') videoRef: ElementRef;

  private srcObject;

  public sharing: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  public async startRecording(): Promise<void> {
    this.srcObject = await (<any>navigator.mediaDevices).getDisplayMedia({
      audio: false,
    });

    this.sharing = true;
  }

  public stopRecording(): void {
    const tracks = this.srcObject.getTracks();
    tracks.forEach(track => track.stop());

    this.srcObject = null;
    this.sharing = false;
  }

}
