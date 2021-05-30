import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  single: any[] = [
    {
      "name": "Happy",
      "value": 0.4
    },
    {
      "name": "Surprised",
      "value": 0.1
    },
    {
      "name": "Neutral",
      "value": 0.1
    },
    {
      "name": "Sad",
      "value": 0.1
    },
      {
      "name": "Angry",
      "value": 0.1
    },
    {
      "name": "Fearful",
      "value": 0.1
    },
    {
      "name": "Disgusted",
      "value": 0.1
    }
  ];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA', '#9ED0E6', '#A10A28', '#E57A44', '#764134' ]
  };

  ngOnInit(): void {
  }

  constructor() {
    // Object.assign(this, { single });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
