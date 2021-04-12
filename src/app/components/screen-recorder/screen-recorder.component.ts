import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.scss']
})
export class ScreenRecorderComponent implements OnInit {

  @ViewChild('videoref') videoRef: ElementRef;

  @Output() recording: EventEmitter<{ type: 'start' | 'stop', videoRef?: ElementRef }> = new EventEmitter();

  public sharing: boolean = false;

  constructor() {}

  ngOnInit(): void { }

  public async startRecording(): Promise<void> {
    this.videoRef.nativeElement.srcObject = await (<any>navigator.mediaDevices).getDisplayMedia({
      audio: false,
    });

    this.sharing = true;
    this.recording.next({ type: 'start', videoRef: this.videoRef });
  }

  public stopRecording(): void {
    const tracks = this.videoRef.nativeElement.srcObject.getTracks();
    tracks.forEach(track => track.stop());

    this.videoRef.nativeElement.srcObject = null;

    this.sharing = false;
    this.recording.next({ type: 'stop' });
  }
}
