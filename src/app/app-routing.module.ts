import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoodBarometerComponent } from './pages/mood-barometer/mood-barometer.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
}, {
  path: 'barometer',
  component: MoodBarometerComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
