import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { BloodType } from "@core/models/user.model";
import { AddressNeeds } from "@core/models/address-needs.model";
import { Observable, of } from "rxjs";
import { AddressNeedsService } from '@core/services/address-needs.service';

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

  public addressNeeds$: Observable<AddressNeeds[]> = of([]);

  constructor(
    private _addressNeedsService: AddressNeedsService,
  ) {}

  public ngOnInit(): void {
    this.addressNeeds$ = this._addressNeedsService.getAddressNeedsList();
  }

  public checkBloodTypeNeeded(bloodType: BloodType, addressNeeds: AddressNeeds): boolean {
    const fieldName = (
      bloodType
        .toLowerCase()
        .replace('+', 'Plus')
        .replace('-', 'Minus')
    );

    // @ts-ignore
    return addressNeeds[fieldName] === 'need';
  }

}
