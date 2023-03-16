import { Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Payload } from '../models/payload';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApodService {
  apiKey: string = 'RcDlBrpTe5hIcYRzarcCeyiUhNWcooWMrpqhAL0e';
  static readonly BASE_API_URL: string = `${environment.apiBaseUrl}`;
  private photo = new Subject<Payload>();

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getPhoto(): Observable<Payload> {
    return this.photo.asObservable();
  }

  public updateDate(date: Date) {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.http.get<Payload>(`${ApodService.BASE_API_URL}?api_key=${this.apiKey}&date=${formattedDate}`).subscribe(payload => {
      this.photo.next(payload);
    })
  }
  }

