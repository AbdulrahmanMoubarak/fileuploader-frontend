import { Component } from '@angular/core';
import {UploadService} from "./upload.service";
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service:UploadService) {
  }

  showErr: boolean = false;
  fileSize: number = 50;
  errMsg = ""
  showUpload = false;
  progress = 0;

  uploadFile($event: MouseEvent, upFile: HTMLInputElement){
      if (upFile.files != null) {
        let file = upFile.files[0];
        if(file.name.includes(".txt")) {
          this.service.uploadFile(file).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                console.log("uploading")
                this.showUpload = true;
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                console.log(event.status)
                this.errMsg = event.body.message;
              }
            },
            err => {
              this.showErr = true;
              this.showUpload = false;
              this.progress = 0;
              this.errMsg = 'Could not upload the file!';
            }
          );
        } else{
          this.showErr = true;
          this.errMsg = "Only accepts text files";
        }
      }
  }


  editMaxSize($event: MouseEvent, fileSize: HTMLInputElement) {
    console.log(fileSize.value)
      if(fileSize.value != null){
        this.service.editMaxFileSize(fileSize.value).subscribe(()=>{

        });
      }
  }
}
