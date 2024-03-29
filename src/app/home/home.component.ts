import { Component, OnInit, Input } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Payload } from '../models/payload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  media_type: string = '';

  videoUrl: SafeResourceUrl = '';

  payload: Observable<Payload>;

  constructor(
    private apodService: ApodService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.payload = this.apodService.getPhoto();
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, 1000);
    this.apodService.updateDate(new Date());
    this.payload.subscribe(data => {
      console.log(data)
      this.media_type = data.media_type;
      if(this.media_type == 'video'){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
      }
    }) 
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
