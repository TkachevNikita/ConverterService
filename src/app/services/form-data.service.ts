import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ModalService } from './modal.service';
import { ErrorModalComponent } from '../components/modals/error-modal/error-modal.component';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()

export class FormDataSevice {

  constructor(
    private http: HttpClient,
    private _modalService: ModalService,
    private _errorHandler: ErrorHandlerService
  ) {}

  public requestData(formData: FormData, registrationForm: FormGroup): void {
      this.http.post('http://45.12.236.36/upload', formData)
          .pipe(
              switchMap((response: any) => {
                return this.http.get('http://45.12.236.36/convert/' + response.file_name);
              })
          )
          .subscribe({
              next: (finalResponse: any) => {
                  registrationForm.patchValue({userOutput: JSON.stringify(finalResponse, null, 1)})
              },
              error: (error: any) => {
                  this._modalService.openModal(ErrorModalComponent, this._errorHandler.getError(error))
              }
          })
  }

}
