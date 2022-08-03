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

  getTicket(filename: string, filesize: number, userId: string): Observable<SystemTicketModel> {
    let formdata = new FormData();
    formdata.append("userId",userId);
    formdata.append("fileName",filename);
    formdata.append("fileSize",String(filesize));
    return this.client.post<SystemTicketModel>(this.baseURL + 'requestTicket', formdata,{
      headers: this.httpHeaders,
    });
  }

  activateTicket(ticketId: number){
    console.log("ticket activation requested");
    let formdata = new FormData();
    formdata.append("ticketId",String(ticketId));
    return this.client.put(this.baseURL+"activateTicket", formdata, {
      headers: this.httpHeaders,
    }).subscribe();
  }
}
