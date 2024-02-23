import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { PointsService } from '@core/services/points.service';
import { User } from "@core/models/user.model";
import { debounceTime, Observable, of } from "rxjs";
import { AddressNeeds } from "@core/models/address-needs.model";
import { FormControl } from "@angular/forms";
import { AddressNeedsService } from "@core/services/address-needs.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public addressNeeds$: Observable<AddressNeeds[]> = of([]);

  public bloodCenterSearchControl = new FormControl('');

  public bloodCenterIndex = 0;

  public get currentUser(): User {
    return this._authService.currentUser as User;
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _addressNeedsService: AddressNeedsService,
  ) { }

  public ngOnInit(): void {
    this.addressNeeds$ = this._addressNeedsService.getAddressNeedsList({});

    this.bloodCenterSearchControl.valueChanges
      .pipe(
        debounceTime(1000),
      )
      .subscribe(() => {
        this.addressNeeds$ = this._addressNeedsService.getAddressNeedsList({
          title: this.bloodCenterSearchControl.value,
        });
      });
  }

  goToDonations(){
    this._router.navigate(['/donations'])
  }

  public onLogout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
