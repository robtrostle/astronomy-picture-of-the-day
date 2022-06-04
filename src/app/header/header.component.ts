import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  payload: any = [];
  constructor(private apodService: ApodService) { }

  ngOnInit(): void {
  }

  searchChanged() {
    this.getPhoto();
  }
  getPhoto(): void {
    this.apodService.getPhoto().subscribe((response: any) => {
      console.log(response);
      this.payload = response;
    });
  }
}
