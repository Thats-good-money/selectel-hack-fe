import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor(private http: HttpClient) { }

  sendData(formData: FormData, url: string){
    return this.http.post(url, formData)
  }
}
