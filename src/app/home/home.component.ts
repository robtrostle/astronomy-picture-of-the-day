import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Payload } from '../models/payload';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  media_type: string = '';

  videoUrl: SafeResourceUrl = '';
  hasEmbed: boolean = false;
  errorMessage: string = '';

  payload: Observable<Payload>;

  constructor(
    private apodService: ApodService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.payload = this.apodService.getPhoto();
    this.apodService.getError().subscribe((message) => {
      this.errorMessage = message;
    });
    this.apodService.updateDate(new Date());
    this.payload.subscribe((data) => {
      this.errorMessage = '';
      this.media_type = data.media_type;
      this.hasEmbed = false;
      // New API: `url` is the post permalink, not a media URL. For video/iframe
      // posts the embeddable source lives inside `basic_html`.
      if (data.media_type === 'video' || data.media_type === 'iframe') {
        const src = this.extractIframeSrc(data.basic_html);
        if (src) {
          this.hasEmbed = true;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        }
      }
    });
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private extractIframeSrc(html?: string): string | null {
    if (!html) {
      return null;
    }
    const match = html.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
    return match ? match[1] : null;
  }
}
