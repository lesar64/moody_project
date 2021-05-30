import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, scan, share } from 'rxjs/operators';
import { ScreenRecorderService } from './screen-recorder.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  static MOVING_AVERAGE_NUMBER = 10;

  static MOVING_STD_NUMBER = 60 * 15;

  constructor(private screenRecorder: ScreenRecorderService) { }

  ngOnInit(): void { }

  public curr_num = DashboardService.MOVING_STD_NUMBER;

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
  moving_values = (length) => scan((acc, curr) => {
    if (!curr) { return acc; }

    acc.push(curr);

    if (acc.length > length) {
      acc.shift();
    }

    return acc;
  }, []);

  // Calculate mean
  mean = () => map((arr: Array<number>) => 
    arr.reduce((acc, current) => acc + current, 0) / arr.length);

  public mean_happy = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.happy)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),

    share()
  );

  public std_happy = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.happy)
    })),

    this.std(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),
  )

  public moving_std_happy = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.happy)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_STD_NUMBER),

    this.std(),
  )

  public mean_surprised = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.surprised)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),

    share()
  )

  public std_surprised = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.surprised)
    })),

    this.std(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),
  )

  public moving_std_surprised = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.surprised)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_STD_NUMBER),

    this.std(),
  )

  public mean_neutral = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.neutral)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),

    share()
  )

  public std_neutral = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.neutral)
    })),

    this.std(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),
  )

  public moving_std_neutral = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.neutral)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_STD_NUMBER),

    this.std(),
  )

  public mean_sad = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.sad)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),

    share()
  )

  public std_sad = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.sad)
    })),

    this.std(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),
  )

  public moving_std_sad = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.sad)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_STD_NUMBER),

    this.std(),
  )

  public mean_angry = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.angry)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),

    share()
  )

  public std_angry = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.angry)
    })),

    this.std(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),
  )

  public moving_std_angry = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.angry)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_STD_NUMBER),

    this.std(),
  )

  public mean_fearful = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.fearful)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),

    share()
  )

  public std_fearful = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.fearful)
    })),

    this.std(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),
  )

  public moving_std_fearful = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.fearful)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_STD_NUMBER),

    this.std(),
  )

  public mean_disgusted = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.disgusted)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),

    share()
  )

  public std_disgusted = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.disgusted)
    })),

    this.std(),

    this.moving_values(DashboardService.MOVING_AVERAGE_NUMBER),

    // Calculate moving average
    this.mean(),
  )

  public moving_std_disgusted = this.screenRecorder.faceDetections$.pipe(
    
    map((detections) => detections.map((detection) => {
      return (<any>detection.expressions.disgusted)
    })),

    this.mean(),

    this.moving_values(DashboardService.MOVING_STD_NUMBER),

    this.std(),
  )

  private gFObservables = [this.mean_happy, this.std_happy, 
    this.mean_surprised, this.std_surprised,
    this.mean_neutral, this.std_neutral,
    this.mean_sad, this.std_sad,
    this.mean_angry, this.std_angry,
    this.mean_fearful, this.std_fearful,
    this.mean_disgusted, this.std_disgusted] 

  private groupFlow = combineLatest(this.gFObservables).subscribe(
      ([mean_happy, std_happy, mean_surprised, std_surprised,
      mean_neutral, std_neutral, mean_sad, std_sad,
      mean_angry, std_angry, mean_fearful, std_fearful,
      mean_disgusted, std_disgusted]) => {
        let gF = ((1 - std_happy) * mean_happy) + ((1 - std_surprised) * mean_surprised) +
          ((1 - std_neutral) * mean_neutral) + ((1 - std_sad) * mean_sad) +
          ((1 - std_angry) * mean_angry) + ((1 - std_fearful) * mean_fearful) +
          ((1 - std_disgusted) * mean_disgusted)
        this.groupflowIndicator = Math.round(gF * 100) / 100;
      }
  )

  public groupflowIndicator = 0;

  private peakObservables = [this.moving_std_happy, 
    this.moving_std_surprised,
    this.moving_std_neutral,
    this.moving_std_sad,
    this.moving_std_angry,
    this.moving_std_fearful,
    this.moving_std_disgusted] 

  private peak = combineLatest(this.peakObservables).subscribe(
    ([moving_std_happy, moving_std_surprised,
      moving_std_neutral, moving_std_sad,
      moving_std_angry, moving_std_fearful,
      moving_std_disgusted]) => {
        let p = moving_std_happy + moving_std_surprised +
        moving_std_neutral + moving_std_sad +
        moving_std_angry + moving_std_fearful +
        moving_std_disgusted;
        this.peakIndicator = Math.round(p * 100) / 100;
      }
  )

  peakIndicator = 0;
}
