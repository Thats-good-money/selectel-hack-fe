import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { BloodType } from "@core/models/user.model";
import { debounceTime, map, Observable, of } from "rxjs";
import { BloodStationsService } from '@core/services/blood-stations.service';
import { GeographyService } from "@core/services/geography.service";
import { AuthService } from "@core/services/auth.service";
import { BloodStation } from "@core/models/address-needs.model";

@Component({
  selector: 'app-address-needs',
  templateUrl: './address-needs.component.html',
  styleUrls: ['./address-needs.component.scss']
})
export class AddressNeedsComponent implements OnInit {

  public readonly bloodTypes: BloodType[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  public readonly needsFilterForm = new FormGroup({
    bloodType: new FormControl<BloodType | null>(null),
    city: new FormControl<string | null>(null),  // TODO: фильтрация по городам, список городов
  });

  public addressNeeds$: Observable<BloodStation[]> = of([]);

  public cities: string[] = [];

  constructor(
    private _addressNeedsService: BloodStationsService,
    private _geographyService: GeographyService,
    private _authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this._geographyService.getCitiesList()
      .pipe(
        map(cities => cities.map(city => city.title)),
      )
      .subscribe(cities => {
        this.cities = cities;
        this._initFormWithUserData();
      });

    this.needsFilterForm.valueChanges
      .pipe(
        debounceTime(1000),
      )
      .subscribe(() => {
        this.addressNeeds$ = this._addressNeedsService.getBloodStationsList(
          this.needsFilterForm.value
        );
      });

  }

  private _initFormWithUserData(): void {
    const userBloodType = this._authService.currentUser?.bloodType;
    const userCity = this._authService.currentUser?.city;
    let formChanged = false;
    if (userBloodType) {
      this.needsFilterForm.controls.bloodType.setValue(userBloodType);
      formChanged = true;
    }

    if (userCity && this.cities.includes(userCity)) {
      this.needsFilterForm.controls.city.setValue(userCity);
      formChanged = true;
    }

    if (!formChanged)
      this.addressNeeds$ = this._addressNeedsService.getBloodStationsList({});
  }

}
