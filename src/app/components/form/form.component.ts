import { CommonModule } from '@angular/common';
import {Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FormDataSevice } from 'src/app/services/form-data.service';
import { ModalService } from 'src/app/services/modal.service';
import { IError } from 'src/app/interfaces/error.interface';
import { SelectModel } from 'src/app/models/type.model';
import { selectList } from 'src/app/consts/type/type.const';
import { nullList } from 'src/app/consts/null-handler/null-handler.const';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public registrationForm: FormGroup;
  public placeholder1: string = 'Тип данных';
  public placeholder2: string = 'Параметры';
  public currentFile!: File;
  public types: SelectModel[] = selectList;
  public nullParams: SelectModel[] = nullList;
  public fileName!: string;
  @ViewChild('fileUpload', { static: true }) public fileUpload!: ElementRef;

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  constructor(
    private _formDataService: FormDataSevice,
    private _modalService: ModalService,
    ) {
    this.registrationForm = new FormGroup({
      userFile: new FormControl(),
      userType: new FormControl(),
      userParams: new FormControl(null),
      userInput: new FormControl(),
      userOutput: new FormControl(),
    });
  }

  public downloadJson(): void {
    const data = this.registrationForm.controls['userOutput'].value;


    const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();

    window.URL.revokeObjectURL(url);
    a.remove();
  }

  public copyToClipboard(): void {
    const textarea = document.createElement('textarea');
    textarea.value = this.registrationForm.controls['userOutput'].value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }


  public onSubmit(): void {
    const inputFiles = this.fileUpload.nativeElement;
    const formData = new FormData();
    formData.append('body', this.registrationForm.controls['userInput'].value);
    if (inputFiles.files.length > 0) {
      const file = inputFiles.files[0];
      formData.append('uploaded_file', file)
      console.log(this.registrationForm.value);
      this._formDataService.fileRequestData(formData, this.registrationForm)
      return
    }
    this._formDataService.inputRequestData(this.registrationForm);

  }
}
