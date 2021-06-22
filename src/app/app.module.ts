import { NgModule } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { GroupflowComponent } from './components/groupflow/groupflow.component';
import { MoodSwingComponent } from './components/mood-swing/mood-swing.component';
import { PresenterviewComponent } from './pages/presenterview/presenterview.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HappyBarometerComponent } from './components/happy-barometer/happy-barometer.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    GroupflowComponent,
    MoodSwingComponent,
    PresenterviewComponent,
    DashboardComponent,
    HappyBarometerComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxGaugeModule,
    NgxChartsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
