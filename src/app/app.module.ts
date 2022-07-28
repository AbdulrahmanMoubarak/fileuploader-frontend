import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UploadService} from "./upload.service";
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
