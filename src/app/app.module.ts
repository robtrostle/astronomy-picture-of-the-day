import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ImageModule } from 'primeng/image';
import { HttpClientModule } from '@angular/common/http';

import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ImageModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
