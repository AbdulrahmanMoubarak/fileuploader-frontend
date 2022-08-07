import {Component} from '@angular/core';
import {UploadService} from "./services/upload.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {FileTicketService} from "./services/file-ticket.service";
import {SystemTicketModel} from "./models/system-ticket-model";
import {catchError, throwError} from "rxjs";
import * as SparkMD5 from 'spark-md5'

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
  ticketReceived = false;
  chacksumCreated = false;
  fileChecksum = "";

  uploadFile($event: MouseEvent, upFile: HTMLInputElement) {
    this.showErr = false
    this.showUpload = false
    if (this.ticketId == -1) {
      this.showErr = true;
      this.errMsg = "File size exceeds maximum limit, please adjust max size value above";
      return
    }
    if (upFile.files != null) {
      let file = upFile.files[0];
      if (file.name.includes(".txt")) {
        try {
          this.ticketService.activateTicket(this.ticketId);
          this.fileService.uploadFile(file, this.ticketId, this.fileChecksum).subscribe((event: HttpEvent<any>) => {
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
                this.showBtn = false
                upFile.value = "";
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
        } catch (e) {
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

  validateFile($event: Event, upFile: HTMLInputElement, userId: HTMLInputElement) {
    this.showBtn = false;
    if (upFile.files != null) {
      let file = upFile.files[0];
      this.computeChecksumMd5(file).then(
        (md5) => {
          this.setChecksum(md5)
        }
      );
      this.ticketService.getTicket(file.name, file.size, userId.value).subscribe((response: SystemTicketModel) => {
        console.log("ticket id: " + response.ticketId)
        console.log("file name:" + response.fileName)
        console.log("ticket size:" + response.size)
        this.ticketReceived = true;
        this.showBtn = this.ticketReceived && this.chacksumCreated;
        this.ticketId = response.ticketId;
      });
    }
  }

  private setChecksum(md5: string) {
    console.log(`The MD5 hash is: ${md5}`)
    this.fileChecksum = md5;
    this.chacksumCreated = true;
    this.showBtn = this.ticketReceived && this.chacksumCreated;
  }

  private errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      this.showBtn = false;
      this.showErr = true;
      this.showUpload = false
      this.errMsg = error.error.message;
    } else {
      // Get server-side error
      this.showBtn = false;
      this.showErr = true;
      this.showUpload = false
      this.errMsg = `Error: Ticket expired. Please try again`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  computeChecksumMd5(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunkSize = 2097152; // Read in chunks of 2MB
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();

      let cursor = 0; // current cursor in file

      fileReader.onerror = function (): void {
        reject('MD5 computation failed - error reading the file');
      };

      // read chunk starting at `cursor` into memory
      function processChunk(chunk_start: number): void {
        const chunk_end = Math.min(file.size, chunk_start + chunkSize);
        fileReader.readAsArrayBuffer(file.slice(chunk_start, chunk_end));
      }

      // when it's available in memory, process it
      // If using TS >= 3.6, you can use `FileReaderProgressEvent` type instead
      // of `any` for `e` variable, otherwise stick with `any`
      // See https://github.com/Microsoft/TypeScript/issues/25510
      fileReader.onload = function (e: any): void {
        spark.append(e.target.result); // Accumulate chunk to md5 computation
        cursor += chunkSize; // Move past this chunk

        if (cursor < file.size) {
          // Enqueue next chunk to be accumulated
          processChunk(cursor);
        } else {
          // Computation ended, last chunk has been processed. Return as Promise value.
          // This returns the base64 encoded md5 hash, which is what
          // Rails ActiveStorage or cloud services expect
          resolve(spark.end());

          // If you prefer the hexdigest form (looking like
          // '7cf530335b8547945f1a48880bc421b2'), replace the above line with:
          // resolve(spark.end());
        }
      };

      processChunk(0);
    });
  }
}
