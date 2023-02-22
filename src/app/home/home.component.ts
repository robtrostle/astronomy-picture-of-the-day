import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Payload } from '../models/payload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe, formatDate } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

@Input() isDate = FooterComponent.isDate;
@Input() datePicker = FooterComponent.datePicker;

media_type: string = '';

@Input() site: string = 'YouTube';
@Input() key: string = '';

videoUrl: SafeResourceUrl = '';

Url  = 'https://www.youtube.com/embed/ruytirhuirhu';

payload!: Payload;

hasDate: boolean = false;
selectedDate: string | null = "";
events: string[] = [];

  constructor(private apodService: ApodService, private sanitizer: DomSanitizer, @Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe, public router: Router) { }

  ngOnInit(): void {
    
    // if(!FooterComponent.datePicker){
    //   this.getPhoto();
    // } else {
    //   this.router.navigateByUrl('/photo-by-date');
    // }
    this.getPhoto()
    
    // this.getPhotoByDate(FooterComponent.datePicker!);
    console.log('HomeComponent Date: ' + FooterComponent.datePicker)
      
    console.log('todays date from home comp '+this.isDate);
  }

  ngOnChanges():void{
    console.log('ngOnChanges' + this.addEvent);
    //this.getPhotoByDate();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log('home component add event: '+event.value)
    return event.value;
  }

  getPhoto(): void {
    this.apodService.getPhoto().subscribe((response: Payload) => {
      console.log('response: ' + response);
      this.payload = response;
      console.log('payload: ' + this.payload);
      var parts = this.payload.url.split('/');
      
      console.log('parts ' + parts);
      this.key = parts.slice(-1)[0];
      
      console.log('KEY ' + this.key);
      this.videoUrl = this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
    });
  }

  getPhotoByDate(date: string){
    this.apodService.getPhotoByDate(date).subscribe((response: Payload) => {
      this.payload = response;
      console.log('by date' + response)
    }
  );
}

  // addEvent(event: MatDatepickerInputEvent<Date>) {
  //   this.events.push(`${event.value}`);
  //   let chosenDate: string | null = "";
  //   this.selectedDate = this.datePipe.transform(this.events[0], 'yyyy-MM-dd');
  //   chosenDate = this.datePipe.transform(event.target.value, 'yyyy-MM-dd');
  //   console.log('Home Component' + chosenDate)
  //   this.hasDate = true;
  //   this.getPhotoByDate(chosenDate!);
  //   this.ngOnInit();
  // }
  
    getSafeUrl(url: string) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }




