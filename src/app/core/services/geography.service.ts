import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { City } from "@core/models/geography.model";

@Injectable({
  providedIn: 'root'
})
export class GeographyService {

  constructor(
    private _http: HttpClient,
  ) { }

  public getCitiesList(): Observable<City[]> {
    const url = `${environment.apiUrl}/cities`;

    return this._http.get<City[]>(url);
  }

}
