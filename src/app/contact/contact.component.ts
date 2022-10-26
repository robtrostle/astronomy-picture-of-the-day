import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  isLoading: boolean = false;
  responseMessage: string;
  submitted: boolean = false; // show and hide the success message

  constructor() {
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_q2ebzhh', 'template_fitzo4o', e.target as HTMLFormElement, '8Y8mijfAsd_l9PrQW')
      .then((result: EmailJSResponseStatus) => {
        this.responseMessage = "Thanks for the message! I'll get back to you soon!";
        console.log(result.text);
        this.submitted = true; // show the response message
        this.isLoading = true;
      }, (error) => {
        this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
        console.log(error.text);
        this.submitted = true;
      });
  }
}
