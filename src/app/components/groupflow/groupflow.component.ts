import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupflow',
  templateUrl: './groupflow.component.html',
  styleUrls: ['./groupflow.component.scss']
})
export class GroupflowComponent implements OnInit {
  @Input() sd: number;

  public get width(): string {
    return `${100 - this.sd / 2 * 100}%`
  }

  public get sdFormatted(): number {
    return Math.round(this.sd * 100) / 100;
  }

  public get isWarning(): boolean {
    return this.sd > 0.3;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
