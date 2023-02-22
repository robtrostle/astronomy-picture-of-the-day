import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Payload } from '../models/payload';
import { BehaviorSubject } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApodService {
  apiKey: string = 'RcDlBrpTe5hIcYRzarcCeyiUhNWcooWMrpqhAL0e';
  static readonly BASE_API_URL: string = `${environment.apiBaseUrl}`;
  chosenDate: BehaviorSubject<string> = new BehaviorSubject<string>('2020-09-05');
  events: string[] = [];

  constructor(private http: HttpClient,
    public datePipe: DatePipe,
    public router: Router) { }

  public getPhoto(): Observable<Payload> {
    return this.http.get<Payload>(`${ApodService.BASE_API_URL}?api_key=${this.apiKey}`)
  }

  public getPhotoByDate(date: string): Observable<Payload> {
    return this.http.get<Payload>(`${ApodService.BASE_API_URL}?api_key=${this.apiKey}&date=${date}`)
  }

  // addEvent(event: MatDatepickerInputEvent<Date>) {
    
  //   //FooterComponent.datePicker = "";
  //   this.events.push(`${event.value}`);
  //   //let chosenDate: string | null = "";
  //   //chosenDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
  //   //FooterComponent.datePicker = this.datePipe.transform(event.value, 'yyyy-MM-dd');
  //   //FooterComponent.datePicker = this.transformDate(event.value!.toDateString());
  //   //console.log('chosen date => ' + this.chosenDate)

  //   //this.chosenDate = this.datePipe.transform(this.events[0], 'yyyy-MM-dd');
  //   this.chosenDate.next(this.datePipe.transform(this.events[1], 'yyyy-MM-dd')!);
  //   console.log('service date => ' + this.chosenDate)
  //   //FooterComponent.isDate = true;
  //   //this.router.navigateByUrl('photo-by-date');
  //   //console.log(FooterComponent.isDate);
  //   //this.apodService.getPhotoByDate(chosenDate!);
  //   //console.log('datePicker => ' + FooterComponent.datePicker);
  // }

  }

