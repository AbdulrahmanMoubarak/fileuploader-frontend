import {Component} from '@angular/core';
import {UploadService} from "./services/upload.service";
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {FileTicketService} from "./services/file-ticket.service";
import {SystemTicketModel} from "./models/system-ticket-model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fileService: UploadService, private ticketService: FileTicketService) {
  }

  showErr: boolean = false;
  fileSize: number = 50;
  errMsg = ""
  showUpload = false;
  progress = 0;
  showBtn = false;
  ticketId = -1

  uploadFile($event: MouseEvent, upFile: HTMLInputElement) {
    this.showErr = false
    this.showUpload = false
    if(this.ticketId == -1){
      this.showErr = true;
      this.errMsg = "File size exceeds maximum limit, please adjust max size value above";
      return
    }
    if (upFile.files != null) {
      let file = upFile.files[0];
      if (file.name.includes(".txt")) {
        try {
          this.fileService.uploadFile(file, this.ticketId).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log('Request has been made!');
                this.progress = 100;
                break;
              case HttpEventType.ResponseHeader:
                console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                this.showUpload = true;
                // @ts-ignore
                this.progress = Math.round(event.loaded / event.total * 100);
                break;
              case HttpEventType.Response:
                this.showErr = true;
                this.showUpload = false;
                this.errMsg = "File Uploaded!"
                console.log('File successfully uploaded', event.body);
                setTimeout(() => {
                  this.progress = 0;
                }, 1500);
                break;
              default:
                break;
            }
          })
        }catch (e) {
          this.showErr = true;
          this.errMsg = "error uploading please try again";
          upFile.value = "";
          this.showBtn = false
        }
      } else {
        this.showErr = true;
        this.errMsg = "Only accepts text files";
      }
    }
  }


  editMaxSize($event: MouseEvent, fileSize: HTMLInputElement, fileSelector: HTMLInputElement) {
    console.log(fileSize.value)
    fileSelector.value = "";
    this.showBtn = false
    if (fileSize.value != null) {
      this.fileService.editMaxFileSize(fileSize.value).subscribe(() => {

      });
    }
  }

  validateFile($event: Event, upFile: HTMLInputElement) {
    this.showBtn = false;
    if (upFile.files != null) {
      let file = upFile.files[0];
      this.ticketService.getTicket(file.name, file.size, 3).subscribe((response: SystemTicketModel) => {
        console.log("ticket id: " + response.ticketId)
        console.log("file name:" + response.fileName)
        console.log("ticket size:" + response.size)
        this.showBtn = true
        this.ticketId = response.ticketId;
      });
    }
  }
}
