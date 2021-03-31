import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenRecorderComponent } from './components/screen-recorder/screen-recorder.component';

const routes: Routes = [{
  path: '',
  component: ScreenRecorderComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
