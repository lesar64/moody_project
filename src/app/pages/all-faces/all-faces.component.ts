import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-all-faces',
  templateUrl: './all-faces.component.html',
  styleUrls: ['./all-faces.component.scss']
})
export class AllFacesComponent implements OnInit {

  constructor(private screenRecorder: ScreenRecorderService) { }

  ngOnInit(): void {
  }
  public faceDetections$ = this.screenRecorder.faceDetections$;
  public recordChange$ = this.screenRecorder.record$;
}
