import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StationsResponse} from "@core/models/station.model";

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor(private http: HttpClient) { }

  getStations(url: string): Observable<StationsResponse>{
    return this.http.get<StationsResponse>(url)
  }
}
