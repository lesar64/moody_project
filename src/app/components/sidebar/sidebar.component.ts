import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private screenRecorder: ScreenRecorderService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // trackNow()
  start(): void {
    // console.log("Start button was pressed.")

    this.screenRecorder.startRecording().then(() => {
      this.router.navigateByUrl('presenterview');
    });
  }

  stop() {
    // console.log("Stop button was pressed.")

    this.screenRecorder.stopRecording().then(() => {
      this.router.navigateByUrl('analytics');
    });
  }

}
