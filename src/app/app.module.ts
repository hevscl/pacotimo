import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpErrorHandler } from 'src/services/http-handle-error.service';
import { MessageService } from 'src/services/message.service';
import { Requests } from 'src/services/requests.service';
import { Clean } from 'src/utils/clean';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacotimoComponent } from './pages/pacotimo/pacotimo.component';

@NgModule({
  declarations: [
    AppComponent,
    PacotimoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpErrorHandler, MessageService, Clean, Requests],
  bootstrap: [AppComponent]
})
export class AppModule { }
