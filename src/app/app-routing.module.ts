import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { PieChartComponent } from './pages/pie-chart/pie-chart.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { HomeComponent } from './pages/home/home.component';
import { MoodBarometerComponent } from './pages/mood-barometer/mood-barometer.component';
import { PresenterviewComponent } from './pages/presenterview/presenterview.component';
import {AllFacesComponent} from './pages/all-faces/all-faces.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
}, {
  path: 'barometer',
  component: MoodBarometerComponent
}, {
   path: 'presenterview',
   component: PresenterviewComponent
}, {
  path: 'analytics',
  component: AnalyticsComponent,
}, {
  path: 'pie-chart',
  component: PieChartComponent,
}, {
    path: 'all-faces',
    component: AllFacesComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], /*RouterModule.forRoot(routes)*/
  exports: [RouterModule]
})
export class AppRoutingModule { }
