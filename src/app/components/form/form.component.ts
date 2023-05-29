import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http'

interface DataType {
  value: string;
  viewValue: string;
}

interface Format {
  value: string;
  viewValue: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
    MatSelectModule, HttpClientModule],
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  types: DataType[] = [
    {value: 'string', viewValue: 'String'},
    {value: 'number', viewValue: 'Number'},
    {value: 'boolean', viewValue: 'Boolean'},
    {value: 'array', viewValue: 'Array'},
    {value: 'null', viewValue: 'Null'},
  ];

  formats: Format[] = [
    {value: 'xlsx', viewValue: 'XLSX'},
    {value: 'csv', viewValue: 'CSV'},
    {value: 'tsv', viewValue: 'TSV'},
    {value: 'htmltable', viewValue: 'HTML TABLE'},
  ];

  public fileName!: string;
  public response!: any;
  @Output() showError = new EventEmitter<boolean>();
  @Output() showErrorTitle = new EventEmitter<string>();
  @Output() showErrorText = new EventEmitter<string>();

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  public registrationForm: FormGroup;

  constructor(private http: HttpClient) {
    this.registrationForm = new FormGroup({
      userFile: new FormControl(),
      userType: new FormControl(),
      userFormat: new FormControl(),
      userInput: new FormControl(),
      userOutput: new FormControl(),
    });
  }

  public refactorErrorTitle(errorStatus: number): string {
    switch(errorStatus) {
      case 400: {
        return '400 Неподдерживаемый формат'
      }
      default:
        return 'Что-то пошло не так'
    }
  }

  public refactorErrorText(errorStatus: number): string {
    switch(errorStatus) {
      case 400: {
        return 'Загружен файл неверного формата. Повторите попытку...'
      }
      default:
        return 'Что-то пошло не так'
    }
  }

  public drawErrorText(errorText: string): void {
    this.showErrorText.emit(errorText)
  }

  public drawErrorTitle(errorText: string): void {
    this.showErrorTitle.emit(errorText)
  }

  public openErrorDialog(): void {
    this.showError.emit(true);
  }

  public onSubmit() {
    const formData = new FormData();
    const fileInput = <HTMLInputElement>document.getElementById('userFile');
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('uploaded_file', file)
      this.http.post('http://45.12.236.36/upload', formData)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.fileName = response.file_name;
            formData.append('file_name', this.fileName);
            this.http.get('http://45.12.236.36/convert/' + this.fileName)
              .subscribe((response: any) => this.registrationForm.patchValue({userOutput: JSON.stringify(response, null, 1)}));
          },
          error: (error: any) => {
            this.drawErrorTitle(this.refactorErrorTitle(error.status));
            this.drawErrorText(this.refactorErrorText(error.status));
            this.openErrorDialog();
          }
      });
    }
  }
}
