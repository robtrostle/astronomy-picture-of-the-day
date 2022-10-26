import { Component, OnInit } from '@angular/core';
import { Payload } from '../models/payload';
import { ApodService } from '../services/apod.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  payload!: Payload;
  date: Date = new Date();
  
  constructor(private apodService: ApodService) { }

  ngOnInit(): void {
    this.getPhoto();
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
