import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss'],
})
export class VideoCaptureComponent implements AfterViewInit {

  @Input() videoRef?: ElementRef;

  @Input() width?: number;
  @Input() height?: number;
  @Input() xMin?: number;
  @Input() yMin?: number;

  @ViewChild('canvas') private canvas: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.updateImage();
  }

  public updateImage(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.drawImage(this.videoRef.nativeElement, Math.round(this.xMin), Math.round(this.yMin), Math.round(this.width), Math.round(this.height), 0, 0, Math.round(this.width), Math.round(this.height));

  }

}
