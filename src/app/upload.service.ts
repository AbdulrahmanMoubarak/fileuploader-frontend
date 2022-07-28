import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseURL = 'http://localhost:8080/';

  private httpHeaders = {
    'Access-Control-Allow-Origin': '*/*',
    'Access-Control-Allow-Credentials': 'true',

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
