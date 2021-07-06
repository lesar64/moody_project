import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private screenRecorder: ScreenRecorderService,
    private dashboard: DashboardService,
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

  stop(): void {
    // console.log("Stop button was pressed.")

    this.screenRecorder.stopRecording().then(() => {
      this.router.navigateByUrl('analytics');
    });
  }

  download(): number | undefined {
    if (!this.dashboard.groupFlow?.length &&
      !this.dashboard.peak?.length &&
      !this.dashboard.happy?.length
      ) { return undefined; }

      let groupFlowFile = new Blob([JSON.stringify(this.dashboard.groupFlow)], {
        type: 'json',
      });

      let peakFile = new Blob([JSON.stringify(this.dashboard.peak)], {
        type: 'json',
      });

      let happyFile = new Blob([JSON.stringify(this.dashboard.happy)], {
        type: 'json',
      });

      fileSaver.saveAs(groupFlowFile, 'groupFlow-1.json');

      fileSaver.saveAs(peakFile, 'peak-1.json')

      fileSaver.saveAs(happyFile, 'happy-1.json')
  }

}
