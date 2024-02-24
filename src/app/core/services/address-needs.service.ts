import { Injectable } from '@angular/core';
import { AddressNeedsFilters, BloodStation } from "@core/models/address-needs.model";
import { environment } from 'environments/environment';
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BloodTypeFieldNames } from "@core/models/user.model";
import { AuthService } from "@core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AddressNeedsService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) { }

  public getAddressNeedsList(filters: AddressNeedsFilters): Observable<BloodStation[]> {
    const url = `${environment.apiUrl}/blood_stations`;

    const headers = this._authService.getAuthHeaders();

    return (
      this._http.get<BloodStation[]>(url, { headers })
        .pipe(
          map(addressNeeds => {
            return addressNeeds.filter(addressNeed => {
              let result = true;

              if (filters.bloodType) {
                const fieldName = BloodTypeFieldNames[filters.bloodType]

                // @ts-ignore
                result = addressNeed[fieldName] === 'need';
              }
              if (filters.city) {
                result = addressNeed.cityDto.title.includes(filters.city);
              }
              if (filters.title) {
                result = addressNeed.title.includes(filters.title);
              }

              return result;
            });
          }),
        )
    );
  }

}
