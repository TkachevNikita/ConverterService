import { Injectable } from "@angular/core";
import { IError } from "../interfaces/error.interface";
import { ErrorTitle } from "../enums/error-title.enum";
import { ErrorText } from "../enums/error-text.enum";

@Injectable()
export class ErrorHandlerService {

    private _errorTitle!: string;
    private _errorText!: ErrorText;

    public getError(errorResponse: any): IError {
        this.handleError(errorResponse);

        const error = {
            errorTitle: this._errorTitle,
            errorText: this._errorText
        }

        return error;
    }

    public handleError(errorResponse: any): void {
        switch(errorResponse.status) {
            case 400:
              this._errorTitle = String(errorResponse.status) + ' ' + ErrorTitle.InvalidFormat;
              this._errorText = ErrorText.InvalidFormat;
              break;
            case 413:
              this._errorTitle = String(errorResponse.status) + ' ' + ErrorTitle.EntityToLarge;
              this._errorText = ErrorText.EntityToLarge;
              break;
            case 500:
              this._errorTitle = String(errorResponse.status) + ' ' + ErrorTitle.InternalServerError;
              this._errorText = ErrorText.InternalServerError;
              break;
            case 503:
              this._errorTitle = String(errorResponse.status) + ' ' + ErrorTitle.ServerUnavailable;
              this._errorText = ErrorText.ServerUnavailable;
              break;
            case 504:
              this._errorTitle = String(errorResponse.status) + ' ' + ErrorTitle.ConnectionTimeout;
              this._errorText = ErrorText.ConnectionTimeout;
              break;
            default:
              this._errorTitle = ErrorTitle.SomethingWentWrong;
              this._errorText = ErrorText.SomethingWentWrong;
              break;
        }
    }
}
