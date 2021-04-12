import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenRecorderComponent } from './components/screen-recorder/screen-recorder.component';
import { EmotionRollercoasterComponent } from './components/emotion-rollercoaster/emotion-rollercoaster.component';
import { ActiveEmotionsComponent } from './components/active-emotions/active-emotions.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenRecorderComponent,
    EmotionRollercoasterComponent,
    ActiveEmotionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
