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
import { FormsModule } from '@angular/forms';
import { ErrorHandlerService } from './services/error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    UploadComponent,
    SelectComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormComponent,
    FormsModule
  ],
  providers: [
    FormDataSevice,
    ModalService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
