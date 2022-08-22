import { Component, OnInit, Input } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Payload} from '../models/payload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

payload: any = [];

@Input() site: string = 'YouTube';
@Input() key: string | null = null;

videoUrl: SafeResourceUrl = '';

//payload: Payload[] = [];

  constructor(private apodService: ApodService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto(): void {
    this.apodService.getPhoto().subscribe((response: Payload[]) => {
      console.log(response);
      this.payload = response;
      // this.key = this.payload.url.substring(this.payload.lastIndexOf('/') + 1);
      var parts = this.payload.url.split('/');
      this.key = parts.pop();
      console.log('KEY ' + this.key);
      this.videoUrl = this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
    });
  }
    getSafeUrl(url: string) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    
  }

 

  // getPhoto(): void {
  //   this.apodService.getPhoto().subscribe((response: any) => {
  //     console.log(response);
  //     this.payload = response;
  //   });
  // }



