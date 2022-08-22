import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {ImageModule} from 'primeng/image';
import { HttpClientModule } from '@angular/common/http';
import { VideoEmbedComponent } from './video-embed/video-embed.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    VideoEmbedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
