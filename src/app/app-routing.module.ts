import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { HomeComponent } from './pages/home/home.component';
import { MoodBarometerComponent } from './pages/mood-barometer/mood-barometer.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
}, {
  path: 'barometer',
  component: MoodBarometerComponent
}, {
  path: 'analytics',
  component: AnalyticsComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
