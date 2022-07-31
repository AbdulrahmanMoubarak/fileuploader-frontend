import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, Observer} from "rxjs";
import {SystemTicketModel} from "../models/system-ticket-model";
import {TicketMetadata} from "../models/ticket-metadata";

@Injectable({
  providedIn: 'root'
})
export class FileTicketService {

  private baseURL = 'http://localhost:5002/';

  private httpHeaders = {
    'Access-Control-Allow-Origin': '*',
    'responseType': 'json',
    'observe': 'response',
  };

  constructor(private client: HttpClient) {
  }

  getTicket(filename: string, filesize: number, userId: number): Observable<SystemTicketModel> {
    let formdata = new FormData();
    let metadata = new TicketMetadata(userId, filename, filesize);
    formdata.append("userId",String(userId));
    formdata.append("fileName",filename);
    formdata.append("fileSize",String(filesize));
    return this.client.post<SystemTicketModel>(this.baseURL + 'requestTicket', formdata,{
      headers: this.httpHeaders,
    });
  }
}
