import { Injectable } from '@angular/core';
import { AddressNeeds, AddressNeedsFilters } from "@core/models/address-needs.model";
import { environment } from 'environments/environment';
import { filter, map, Observable, of } from "rxjs";
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

  public getAddressNeedsList(filters: AddressNeedsFilters): Observable<AddressNeeds[]> {
    const url = `${environment.externalApiUrl}/address_needs`;

    return (
      this._http.get<Pagination<AddressNeeds>>(url)
        .pipe(
          map(o => keysToCamel(o) as Pagination<AddressNeeds>),
          map(response => response.results),
          map(addressNeeds => {
            return addressNeeds.filter(addressNeed => {
              let result = true;

              if (filters.bloodType) {
                const fieldName = (
                  filters.bloodType
                    .toLowerCase()
                    .replace('+', 'Plus')
                    .replace('-', 'Minus')
                );

                // @ts-ignore
                result = addressNeed[fieldName] === 'need';
              }
              if (filters.city) {
                result = addressNeed.bloodStation.city.title.includes(filters.city);
              }

              return result;
            });
          }),
        )
    );
  }

}
