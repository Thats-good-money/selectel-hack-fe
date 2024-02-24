import { Component, Input } from '@angular/core';
import { BloodType, BloodTypeFieldNames } from "@core/models/user.model";
import { BloodStation } from "@core/models/address-needs.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-address-needs-card',
  templateUrl: './address-needs-card.component.html',
  styleUrls: ['./address-needs-card.component.scss']
})
export class AddressNeedsCardComponent {

  @Input() addressNeed!: BloodStation;

  public readonly bloodTypes: BloodType[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  constructor(
    private _router: Router,
  ) {}


  public checkBloodTypeNeeded(bloodType: BloodType, addressNeeds: BloodStation): boolean {
    const fieldName = BloodTypeFieldNames[bloodType];

    // @ts-ignore
    return addressNeeds[fieldName] === 'need';
  }

  public enrollForDonation(): void {
    this._router.navigate(
      [`/plan-donation`],
      {
        queryParams: {
          bloodStationId: this.addressNeed.bloodStationId,
        },
      },
    );
  }

}
