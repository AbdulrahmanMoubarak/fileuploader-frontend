import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseURL = 'https://file-uploader-spring-app.herokuapp.com/';

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
    'observe': 'response',
  };
  private posthttpOptions = {headers: new HttpHeaders(this.posthttpHeaders)};


  constructor(private client: HttpClient) {
  }

  uploadFile(file: File): Observable<any> {
    console.log("Service Started")
    let formdata = new FormData();
    formdata.append("file", file)
    return this.client.post<any>(this.baseURL + 'upload', formdata, this.posthttpOptions);
  }

  editMaxFileSize(mSize: string): Observable<HttpResponse<any>> {
    console.log("Service started");
    console.log(this.baseURL+"setMaxSize")
    let formdata = new FormData();
    formdata.append("size", mSize)
    return this.client.put<HttpResponse<any>>(this.baseURL + 'setMaxSize', formdata, this.puthttpOptions);
  }
}
