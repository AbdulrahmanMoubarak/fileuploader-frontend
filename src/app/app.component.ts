import { Component } from '@angular/core';
import {UploadService} from "./upload.service";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {takeUntil} from "rxjs";

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
      // if (upFile.files != null) {
      //   let file = upFile.files[0];
      //   if(file.name.includes(".txt")) {
      //     this.service.uploadFile(file).pipe(takeUntil(file.ngUnsubscribe))
      //       .subscribe(
      //         (res: any) => {
      //           if (res.status === 'progress') {
      //             let completedPercentage = parseFloat(res.message);
      //             this.progress = (
      //               (file.size * completedPercentage) /
      //               100
      //             )
      //           } else if (res.status === 'completed') {
      //
      //           }
      //         },
      //         (error: any) => {
      //           console.log('file upload error');
      //           console.log(error);
      //         }
      //       );
      //   } else{
      //     this.showErr = true;
      //     this.errMsg = "Only accepts text files";
      //   }
      // }
  }


  editMaxSize($event: MouseEvent, fileSize: HTMLInputElement) {
    console.log(fileSize.value)
      if(fileSize.value != null){
        this.service.editMaxFileSize(fileSize.value).subscribe(()=>{

        });
      }
  }
}
