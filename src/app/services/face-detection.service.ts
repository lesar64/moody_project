import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root',
})
export class FaceDetectionService {

  constructor() {
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/weights');
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/weights');
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/weights');
  }

  public detectAll(input: HTMLVideoElement | HTMLImageElement): Observable<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[]> {
    return interval(1000).pipe(
      switchMap(() => {
        return new Observable<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>[]>((subscriber) => {
          faceapi.detectAllFaces(input).withFaceExpressions().then((detectedFaces) => {
            subscriber.next(detectedFaces);
            subscriber.complete();
            return detectedFaces;
          })
        })
      }),
      map((detections) => detections.map((detection) => {
        return {
          ...detection,
          aggregated: {
            negative: detection.expressions.sad + detection.expressions.disgusted + detection.expressions.fearful + detection.expressions.angry,
            netural: detection.expressions.neutral,
            positive: detection.expressions.happy + detection.expressions.surprised,
          },
        }
      })),
    );
  }
}
