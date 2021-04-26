import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood-barometer',
  templateUrl: './mood-barometer.component.html',
  styleUrls: ['./mood-barometer.component.scss']
})
export class MoodBarometerComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit(): void {
  }

}
