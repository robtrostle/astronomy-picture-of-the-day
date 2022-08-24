import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Payload } from '../models/payload';


@Injectable({
  providedIn: 'root'
})
export class ApodService {
  apiKey: string = 'RcDlBrpTe5hIcYRzarcCeyiUhNWcooWMrpqhAL0e';
  static readonly BASE_API_URL: string = `${environment.apiBaseUrl}`;
  

  constructor(private http: HttpClient) { }

  public getPhoto(): Observable<Payload> {
    return this.http.get<Payload>(`${ApodService.BASE_API_URL}?api_key=${this.apiKey}`)
  }

  // public getPhoto() {
  //   return this.http.get(`${ApodService.BASE_API_URL}?api_key=${this.apiKey}`)
  // }


  }

