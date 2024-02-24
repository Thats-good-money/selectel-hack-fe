import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { UserDonation } from "@core/models/donation.model";
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "@core/services/auth.service";
import {BonusResponse} from "@core/models/donationsCountByType";

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) { }

  public getUserDonationsList(): Observable<UserDonation[]> {
    const url = `${environment.apiUrl}/donations`;

    const headers = this._authService.getAuthHeaders();

    return this._http.get<UserDonation[]>(url, { headers });
  }

  public getUserDonationsCountByType(): Observable<BonusResponse> {
    const url = `${environment.apiUrl}/donations/by_type`;

    const headers = this._authService.getAuthHeaders();

    return this._http.get<BonusResponse>(url, { headers });
  }

  public isHonoraryDonor(): Observable<Boolean> {
    const url = `${environment.apiUrl}/donations/is-honorary-donor`;

    const headers = this._authService.getAuthHeaders();

    return this._http.get<Boolean>(url, { headers });
  }

}
