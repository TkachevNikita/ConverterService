import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { IError } from "src/app/interfaces/error.interface";
import { ModalService } from "src/app/services/modal.service";

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: [
      '../styles/modals.styles.css',
      './styles/error-modal.component.css'
    ],
    animations: [
      trigger('modalAnimation', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.5)' }),
          animate('300ms', style({ opacity: 1, transform: 'scale(1)' }))
        ]),
      ])
    ]
})
export class ErrorModalComponent {
    @Input() public data!: IError;
    public animateStatus: string = ':enter';
    constructor(private _modalService: ModalService) {}

    public closeModal() {
      this._modalService.closeModal();
    }

}
