import { Component, OnInit, LOCALE_ID, Inject, Output } from '@angular/core';
import { Payload } from '../models/payload';
import { ApodService } from '../services/apod.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  payload!: Payload;
  date: Date = new Date();
  minDate = new Date(1995, 5, 16);
  selectedDate: string | null = "";
  events: string[] = [];
  chosenDate: BehaviorSubject<string> = new BehaviorSubject<string>(this.date.toDateString());

  @Output()
  static datePicker: string | null = "";

  @Output()
  static isDate: boolean = false;
  
  constructor(
  private apodService: ApodService,
  @Inject(LOCALE_ID) private locale: string, 
  public datePipe: DatePipe,
  public router: Router) {
    
   }

  ngOnInit(): void {
    //this.getPhoto();
    console.log('footer ng onit '+ this.date);
  }



  addEvent(event: MatDatepickerInputEvent<Date>) {
    FooterComponent.datePicker = "";
    //this.events.push(`${event.value}`);
    let chosenDate: string | null = "";
    //chosenDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    //FooterComponent.datePicker = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    FooterComponent.datePicker = this.transformDate(event.value!.toDateString());

    console.log('chosen date => ' + chosenDate)
    this.chosenDate.next( this.datePipe.transform(event.value, 'yyyy-MM-dd')!);
    console.log('chosen Date from Footer subject' + this.chosenDate)
    //this.selectedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    //console.log('selected date => ' + this.selectedDate)
    FooterComponent.isDate = true;
    this.router.navigateByUrl('/photo-by-date');
    console.log(FooterComponent.isDate);
    //this.apodService.getPhotoByDate(chosenDate!);
    console.log('datePicker => ' + FooterComponent.datePicker);
  }

  transformDate(date: string) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  

  getPhoto(): void {
    this.apodService.getPhoto().subscribe((response: Payload) => {
      console.log('response: ' + response);
      this.payload = response;
      console.log('payload: ' + this.payload);
      var parts = this.payload.url.split('/');
    });

}
}
