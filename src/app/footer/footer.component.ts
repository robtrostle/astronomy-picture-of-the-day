import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Payload } from '../models/payload';
import { ApodService } from '../services/apod.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  payload: Observable<Payload>;
  date = new FormControl(new Date());
  todayDate: Date = new Date();
  minDate = new Date(1995, 5, 16);

  constructor(private apodService: ApodService) {}

  ngOnInit(): void {
    this.payload = this.apodService.getPhoto();
    this.date.valueChanges.subscribe((value) => {
      this.apodService.updateDate(value!)
    });
  }
}
