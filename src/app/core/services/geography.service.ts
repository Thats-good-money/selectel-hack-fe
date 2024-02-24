import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { City } from "@core/models/geography.model";
import { Pagination } from "@core/models/utils";

@Injectable({
  providedIn: 'root'
})
export class GeographyService {

  constructor(
    private _http: HttpClient,
  ) { }

  public getCitiesList(): Observable<City[]> {
    const url = `${environment.externalApiUrl}/cities`;

    return (
      this._http.get<Pagination<City>>(url)
        .pipe(
          map(response => response.results),
        )
    );
  }

}
