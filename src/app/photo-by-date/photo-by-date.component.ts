import { Component, OnInit, Input, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Payload } from '../models/payload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe, formatDate } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-by-date',
  templateUrl: './photo-by-date.component.html',
  styleUrls: ['./photo-by-date.component.css']
})
export class PhotoByDateComponent implements OnInit, AfterViewInit {
  @Input() datePicker = FooterComponent.datePicker;
  payload!: Payload;
  videoUrl: SafeResourceUrl = '';
  thisDate: string = '2020-07-05';
  

  constructor(private apodService: ApodService, private sanitizer: DomSanitizer, @Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe) { }

  ngOnInit(): void {
    //this.getDate();
    this.getPhotoByDate(this.thisDate);
    // this.getPhotoByDate('2019, 02, 06');
  }

  ngAfterViewInit(): void {
    FooterComponent.datePicker! = "";
  }

  getPhotoByDate(date: string){
    this.apodService.getPhotoByDate(date).subscribe((response: Payload) => {
      this.payload = response;
      console.log('by date' + response)
    }
  );
  }

  getDate(){
    this.apodService.chosenDate.subscribe(
      chosenDate => this.thisDate = chosenDate
    );
    }

}
