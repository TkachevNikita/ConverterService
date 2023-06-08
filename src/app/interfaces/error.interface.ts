import { ErrorText } from "../enums/error-text.enum";
import { ErrorTitle } from "../enums/error-title.enum";

export interface IError {
    errorTitle: string | ErrorTitle;
    errorText: string | ErrorText;
    errorKey?: number;
}
