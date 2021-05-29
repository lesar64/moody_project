import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenRecorderComponent } from './components/screen-recorder/screen-recorder.component';
import { EmotionRollercoasterComponent } from './components/emotion-rollercoaster/emotion-rollercoaster.component';
import { ActiveEmotionsComponent } from './components/active-emotions/active-emotions.component';
import { VideoCaptureComponent } from './components/video-capture/video-capture.component';
import { MoodBarometerComponent } from './pages/mood-barometer/mood-barometer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { BarometerComponent } from './components/barometer/barometer.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { PresenterviewComponent } from './pages/presenterview/presenterview.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HappyBarometerComponent } from './components/happy-barometer/happy-barometer.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenRecorderComponent,
    EmotionRollercoasterComponent,
    ActiveEmotionsComponent,
    VideoCaptureComponent,
    MoodBarometerComponent,
    HeaderComponent,
    HomeComponent,
    BarometerComponent,
    AnalyticsComponent,
    PresenterviewComponent,
    DashboardComponent,
    HappyBarometerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGaugeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
