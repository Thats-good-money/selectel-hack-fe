import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BonusResponse, ExactBonusResponse} from "@core/models/bonus.model";

@Injectable({
  providedIn: 'root'
})
export class BonusesService {

  constructor(private http: HttpClient){
  }

  getBonuses(url: string): Observable<BonusResponse> {
    return this.http.get<BonusResponse>(url)
  }

  getDetails(url: string): Observable<ExactBonusResponse>{
    return this.http.get<ExactBonusResponse>(url)
  }

}
