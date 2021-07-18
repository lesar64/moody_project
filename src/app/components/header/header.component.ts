import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private screenRecorder: ScreenRecorderService,) {}

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  public faces_counter?: number;

  public faces_counter$ = this.screenRecorder.faceDetections$.subscribe((x) => (this.faces_counter = x.length))

  public active?: boolean;

  public active$ = this.screenRecorder.active.subscribe((x) => (this.active = x))

  private ngUnsubscribe: Subject<boolean> = new Subject();

  ngOnDestroy(): void{
    this.faces_counter = null;
    console.log('test')
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
