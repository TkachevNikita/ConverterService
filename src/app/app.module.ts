import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FormComponent } from './components/form/form.component';
import { UploadComponent } from './components/upload/upload.component';
import { SelectComponent } from './components/select/select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'
import { FormDataSevice } from './services/form-data.service';
import { ModalService } from './services/modal.service';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from './services/error-handler.service';
import { CustomSelectComponent } from './components/custom-controls/custom-select/custom-select-control.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    UploadComponent,
    SelectComponent,
    ErrorModalComponent,
    CustomSelectComponent,
    FormComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    FormDataSevice,
    ModalService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
