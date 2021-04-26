import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenRecorderComponent } from './components/screen-recorder/screen-recorder.component';
import { EmotionRollercoasterComponent } from './components/emotion-rollercoaster/emotion-rollercoaster.component';
import { ActiveEmotionsComponent } from './components/active-emotions/active-emotions.component';
import { VideoCaptureComponent } from './components/video-capture/video-capture.component';
import { MoodBarometerComponent } from './components/mood-barometer/mood-barometer.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenRecorderComponent,
    EmotionRollercoasterComponent,
    ActiveEmotionsComponent,
    VideoCaptureComponent,
    MoodBarometerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
