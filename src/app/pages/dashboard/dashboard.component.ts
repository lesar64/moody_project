import { Component, OnInit } from '@angular/core';
import { combineLatest, interval, Observable } from 'rxjs';
import { filter, map, scan, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void { }

}
