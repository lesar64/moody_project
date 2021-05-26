import { Component, OnInit } from '@angular/core';
import { filter, map, scan, take, takeUntil } from 'rxjs/operators';
import { ScreenRecorderService } from 'src/app/services/screen-recorder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private screenRecorder: ScreenRecorderService) { }

  // Helper method to log values to the console
  console = (text: string) => map(arr => {
    console.log(text)
    console.log(arr)
    return arr
  });

  // Calculate std of all people for one emotion
  std = () => map((arr: Array<number>) => {
    let mean = arr.reduce((acc, curr)=>{
      return acc + curr
    }, 0) / arr.length;
      
    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k)=>{
      return (k - mean) ** 2
    })
      
    // Calculating the sum of updated array 
    let sum = arr.reduce((acc, curr)=> acc + curr, 0);
     
    // Calculating the variance
    let variance = sum / arr.length
     
    // Returning the standard deviation
    return Math.sqrt(sum / arr.length)
  });

  // Moving values for the next 10 occurences
  moving_values = () => scan((acc, curr) => {
    if (!curr) { return acc; }

    acc.push(curr);

    if (acc.length > 10) {
      acc.shift();
    }

    return acc;
  }, []);

  // Calculate mean
  mean = () => map((arr: Array<number>) => 
    arr.reduce((acc, current) => acc + current, 0) / arr.length);

  public std_happy = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.happy)
    })),

    this.console("Happy: "),

    this.std(),

    this.moving_values(),

    // Calculate moving average
    this.mean(),
  )

  public std_surprised = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.surprised)
    })),

    this.console("Surprised: "),

    this.std(),

    this.moving_values(),

    // Calculate moving average
    this.mean(),
  )

  public std_neutral = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.neutral)
    })),

    this.console("Neutral: "),

    this.std(),

    this.moving_values(),

    // Calculate moving average
    this.mean(),
  )

  public std_sad = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.sad)
    })),

    this.std(),

    this.moving_values(),

    // Calculate moving average
    this.mean(),
  )

  public std_angry = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.angry)
    })),

    this.std(),

    this.moving_values(),

    // Calculate moving average
    this.mean(),
  )

  public std_fearful = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.fearful)
    })),

    this.std(),

    this.moving_values(),

    // Calculate moving average
    this.mean(),
  )

  public std_disgusted = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.disgusted)
    })),

    this.std(),

    this.moving_values(),

    // Calculate moving average
    this.mean(),
  )

  ngOnInit(): void {
    console.log("Dashboard geladen")
  }

}
