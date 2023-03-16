import { Component, OnInit, Input } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Payload } from '../models/payload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

media_type: string = '';

@Input() site: string = 'YouTube';
@Input() key: string = '';

videoUrl: SafeResourceUrl = '';

Url  = 'https://www.youtube.com/embed/ruytirhuirhu';

payload: Observable<Payload>;

  constructor(private apodService: ApodService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.payload = this.apodService.getPhoto();
    this.apodService.updateDate(new Date());
  }

  // getPhoto(): void {
  //   this.apodService.getPhoto().subscribe((response: Payload) => {
  //     console.log('response: ' + response);
  //     this.payload = response;
  //     console.log('payload: ' + this.payload);

  //     var parts = this.payload.url.split('/');
  //     //var parts = this.Url.split('/');
  //     console.log('parts ' + parts);
  //     this.key = parts.slice(-1)[0];
  //     //this.key = parts.pop() || parts.pop();
  //     console.log('KEY ' + this.key);
  //     this.videoUrl = this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
  //   });
  // }
    getSafeUrl(url: string) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    
  }