import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ModalService } from './modal.service';
import { ErrorModalComponent } from '../components/modals/error-modal/error-modal.component';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()

export class FormDataSevice {
  private fileName!: string;

  constructor(
    private http: HttpClient,
    private _modalService: ModalService,
    private _errorHandler: ErrorHandlerService
  ) {}

  private getAllHeaders(response: any, type: string) {
    for (const key in response) {
    if (response.hasOwnProperty(key)) {
      const obj = response[key];
      for (const field in obj) {
        if (obj.hasOwnProperty(field)) {
            obj[field] = type;
          }
        }
      }
    }

    return response;
  }

  public inputRequestData(registrationForm: FormGroup): void {
    const options = {
      headers: { 'Content-Type': 'text/plain' }
    }

    this.http.post('http://localhost:8000/upload/text', registrationForm.controls['userInput'].value, options
     )
        .pipe(
            switchMap((response: any) => {

              this.fileName = response.file_name;
              console.log(this.fileName);
              return this.http.get('http://localhost:8000/convert/' + this.fileName);
            })

        )
        .subscribe({
            next: (finalResponse: Object) => {
              console.log(finalResponse);
                registrationForm.patchValue({userOutput: JSON.stringify(finalResponse, null, 1)})
            },
            error: (error: any) => {
                console.log(error)
                this._modalService.openModal(ErrorModalComponent, this._errorHandler.getError(error))
            }
        })
  }

  public fileRequestData(formData: FormData, registrationForm: FormGroup): void {
      this.http.post('http://localhost:8000/upload', formData)
          .pipe(
              switchMap((response: any) => {
                this.fileName = response.file_name;
                return this.http.get('http://localhost:8000/headers/' + this.fileName);
              }),
              switchMap((response: any) => {
                let queryParams = new HttpParams()
                  .set('parameters', JSON.stringify(this.getAllHeaders(response, registrationForm.controls['userType'].value)))

                  if (registrationForm.controls['userParams'].value !== null) {
                    queryParams = queryParams.set('null_replacing', registrationForm.controls['userParams'].value);

                  }

                return this.http.get('http://localhost:8000/convert/' + this.fileName, {params: queryParams});
              })
          )
          .subscribe({
              next: (finalResponse: Object) => {
                console.log(finalResponse);
                  registrationForm.patchValue({userOutput: JSON.stringify(finalResponse, null, 1)})
              },
              error: (error: any) => {
                  console.log(error)
                  this._modalService.openModal(ErrorModalComponent, this._errorHandler.getError(error))
              }
          })
  }

}
