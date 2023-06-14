import { CommonModule } from '@angular/common';
import {Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FormDataSevice } from 'src/app/services/form-data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public registrationForm: FormGroup;
  public types: string[] = ['XLSX', 'CSV', 'TSV', 'HTML TABLE']
  public fileName!: string;
  @ViewChild('fileUpload', { static: true }) public fileUpload!: ElementRef;

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  constructor(private _formDataService: FormDataSevice, private _modalService: ModalService) {
    this.registrationForm = new FormGroup({
      userFile: new FormControl(),
      userType: new FormControl(),
      userFormat: new FormControl(),
      userInput: new FormControl(),
      userOutput: new FormControl(),
    });
  }

  public onSubmit(): void {
    console.log(this.registrationForm.value)
    const inputFiles = this.fileUpload.nativeElement;
    const formData = new FormData();
    if (inputFiles.files) {
      const file = inputFiles.files[0];
      formData.append('uploaded_file', file)
      this._formDataService.requestData(formData, this.registrationForm)
    }

  }
}
