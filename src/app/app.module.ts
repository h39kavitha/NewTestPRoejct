import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from './examples/popup-modal/popup-modal.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule , NgbModule.forRoot(),
  FormsModule, ReactiveFormsModule , HttpClientModule ],
  declarations: [ AppComponent, PopupModalComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
