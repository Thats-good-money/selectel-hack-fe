import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { PointsService } from '@core/services/points.service';
import { User } from "@core/models/user.model";
import { debounceTime, Observable, of } from "rxjs";
import { FormControl } from "@angular/forms";
import { BloodStationsService } from "@core/services/blood-stations.service";
import { BloodStation } from "@core/models/address-needs.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public addressNeeds$: Observable<BloodStation[]> = of([]);

  public bloodCenterSearchControl = new FormControl('');

  public bloodCenterIndex = 0;

  public get currentUser(): User {
    return this._authService.currentUser as User;
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _addressNeedsService: BloodStationsService,
  ) { }

  public ngOnInit(): void {
    this.addressNeeds$ = this._addressNeedsService.getBloodStationsList({});

    this.bloodCenterSearchControl.valueChanges
      .pipe(
        debounceTime(1000),
      )
      .subscribe(() => {
        this.addressNeeds$ = this._addressNeedsService.getBloodStationsList({
          title: this.bloodCenterSearchControl.value,
        });

        this.bloodCenterIndex = 0;
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
