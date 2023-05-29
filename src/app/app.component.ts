import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public modalIsOpen: boolean = false;
  public message!: string;
  public text!: string;

  public receiveMessage($event: string) {
    this.message = $event;
  }

  public receiveText($event: string) {
    this.text = $event;
  }

  public openModal(): void {
    this.modalIsOpen = true;
  }

  public closeModal(): void {
    this.modalIsOpen = false;
  }
}
