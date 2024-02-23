import { Injectable } from '@angular/core';
import { AddressNeeds } from "@core/models/address-needs.model";
import { environment } from 'environments/environment';
import { map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Pagination } from "@core/models/utils";
import { keysToCamel } from "@shared/lib/api-utils";

@Injectable({
  providedIn: 'root'
})
export class AddressNeedsService {

  constructor(
    private _http: HttpClient,
  ) { }

  public getAddressNeedsList(): Observable<AddressNeeds[]> {
    const url = `${environment.externalApiUrl}/address_needs`;

    return (
      this._http.get<Pagination<AddressNeeds>>(url)
        .pipe(
          map(o => keysToCamel(o) as Pagination<AddressNeeds>),
          map(response => response.results),
        )
    );
  }

}
