import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private screenRecorder: ScreenRecorderService,
              private router: Router) { }

  ngOnInit(): void {
  }

  trackNow(): void {
    this.screenRecorder.startRecording().then(() => {
      this.router.navigateByUrl('presenterview');
    });
  }

}
