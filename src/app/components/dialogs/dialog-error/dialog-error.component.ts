import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    templateUrl: 'dialog-error.component.html',
    selector: 'app-dialog-error',
    styleUrls: ['./styles/dialog-error.component.css'],
})

export class DialogErrorComponent {
  @Input() isOpenModal = false;
  @Input() errorTitle!: string;
  @Input() errorText!: string;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.closeModalEvent.emit(false);
  }
}
