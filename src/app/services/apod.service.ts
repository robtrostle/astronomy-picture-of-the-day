import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Payload } from '../models/payload';
import { Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApodService {
  static readonly BASE_API_URL: string = `${environment.apiBaseUrl}`;
  private photo = new Subject<Payload>();
  private error = new Subject<string>();

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getPhoto(): Observable<Payload> {
    return this.photo.asObservable();
  }

  public getError(): Observable<string> {
    return this.error.asObservable();
  }

  public updateDate(date: Date) {
    // The new WordPress-backed APOD API identifies each post by a YYMMDD id in
    // the path (e.g. /apod-basic/261006). No api_key is required.
    const id = this.datePipe.transform(date, 'yyMMdd');
    this.http.get<Payload>(`${ApodService.BASE_API_URL}/${id}`)
      .pipe(
        catchError(() => {
          // 404 "apod_basic_not_found" is returned for dates with no post.
          this.error.next('No Astronomy Picture of the Day is available for this date.');
          return of(null);
        })
      )
      .subscribe(payload => {
        if (payload) {
          this.photo.next(payload);
        }
      });
  }
}
