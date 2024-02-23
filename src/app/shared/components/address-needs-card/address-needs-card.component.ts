import { Component, Input } from '@angular/core';
import { AddressNeeds } from "@core/models/address-needs.model";
import { BloodType } from "@core/models/user.model";

@Component({
  selector: 'app-address-needs-card',
  templateUrl: './address-needs-card.component.html',
  styleUrls: ['./address-needs-card.component.scss']
})
export class AddressNeedsCardComponent {

  @Input() addressNeed!: AddressNeeds;

  public readonly bloodTypes: BloodType[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

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
