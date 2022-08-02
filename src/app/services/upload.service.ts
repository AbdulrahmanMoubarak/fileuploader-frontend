import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  //private baseURL = 'https://file-uploader-spring-app.herokuapp.com/';
  private baseURL = 'http://localhost:5002/';

  private puthttpHeaders = {
    'Access-Control-Allow-Origin': '*',
    'reportProgress': 'true',
    'responseType': 'json',
    'observe': 'response',
  };
  private puthttpOptions = {headers: new HttpHeaders(this.puthttpHeaders)};

  private posthttpHeaders = {
    'Access-Control-Allow-Origin': '*',
    'reportProgress': 'true',
    'responseType': 'json',
    'observe': 'events',
  };
  private posthttpOptions = {headers: new HttpHeaders(this.posthttpHeaders)};


  constructor(private client: HttpClient) {
  }

  uploadFile(file: File, ticketId: number) {
    console.log("Service Started")
    let formdata = new FormData();
    formdata.append("file", file)
    formdata.append("ticketId", String(ticketId));
    return this.client.post(this.baseURL + 'upload', formdata, {
      reportProgress: true,
      observe: 'events',
    });
  }



  editMaxFileSize(mSize: string): Observable<HttpResponse<any>> {
    console.log("Service started");
    console.log(this.baseURL+"setMaxSize")
    let formdata = new FormData();
    formdata.append("size", mSize)
    return this.client.put<HttpResponse<any>>(this.baseURL + 'setMaxSize', formdata, this.puthttpOptions);
  }
}
