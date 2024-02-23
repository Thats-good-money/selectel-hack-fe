import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CitiesResponse} from "@core/models/city.model";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {
  }

  getCities(url: string): Observable<CitiesResponse>{
    return this.http.get<CitiesResponse>(url)
  }
}
