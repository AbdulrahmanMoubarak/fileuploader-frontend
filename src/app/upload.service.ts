import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseURL = 'https://file-uploader-spring-app.herokuapp.com/';

  private httpHeaders = {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "Origin, X-Requested, Content-Type, Accept Authorization",
    "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE",
    'Access-Control-Allow-Credentials': 'true',
    'Accept':"*/*",
    "Content-Type": "multipart/form-data",
  };
  private httpOptions = {headers: new HttpHeaders(this.httpHeaders)};

  constructor(private client: HttpClient) {
  }

  uploadFile(file: File): Observable<any> {
    console.log("Service Started")
    let formdata = new FormData();
    formdata.append("file", file)
    return this.client.post<any>(this.baseURL + 'upload', formdata, {observe: 'response'});
  }

  editMaxFileSize(mSize: string): Observable<HttpResponse<any>> {
    console.log("Service started");
    console.log(this.baseURL+"setMaxSize")
    let formdata = new FormData();
    formdata.append("size", mSize)
    return this.client.put<HttpResponse<any>>(this.baseURL + 'setMaxSize', formdata, this.httpOptions);
  }
}
