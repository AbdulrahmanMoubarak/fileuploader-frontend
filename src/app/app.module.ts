import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UploadService} from "./services/upload.service";
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {FileTicketService} from "./services/file-ticket.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UploadService, FileTicketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
