import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { combineLatest } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {

  private mean_emotion$;

  ngOnInit(): void {
    this.mean_emotion$ = combineLatest([
      this.dashbaord.mean_happy,
      this.dashbaord.mean_surprised,
      this.dashbaord.mean_neutral,
      this.dashbaord.mean_sad,
      this.dashbaord.mean_angry,
      this.dashbaord.mean_fearful,
      this.dashbaord.mean_disgusted
    ]).subscribe(([mean_happy, mean_surprised,
        mean_neutral, mean_sad, mean_angry,
        mean_fearful, mean_disgusted]) => {
        this.mean_emotion = [
          {
            "name": "Happy",
            "value": mean_happy
          },
          {
            "name": "Surprised",
            "value": mean_surprised
          },
          {
            "name": "Neutral",
            "value": mean_neutral
          },
          {
            "name": "Sad",
            "value": mean_sad
          },
            {
            "name": "Angry",
            "value": mean_angry
          },
          {
            "name": "Fearful",
            "value": mean_fearful
          },
          {
            "name": "Disgusted",
            "value": mean_disgusted
          }
        ];

    });
  }

  // Data
  mean_emotion: any[] = [
    {
      "name": "Happy",
      "value": 1 / 7
    },
    {
      "name": "Surprised",
      "value": 1 / 7
    },
    {
      "name": "Neutral",
      "value": 1 / 7
    },
    {
      "name": "Sad",
      "value": 1 / 7
    },
      {
      "name": "Angry",
      "value": 1 / 7
    },
    {
      "name": "Fearful",
      "value": 1 / 7
    },
    {
      "name": "Disgusted",
      "value": 1 / 7
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

  constructor(private dashbaord: DashboardService) {
    // Object.assign(this, { single });
  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
