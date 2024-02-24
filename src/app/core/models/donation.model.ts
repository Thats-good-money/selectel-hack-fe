import { BloodType } from "@core/models/user.model";
import { BloodStation } from "@core/models/address-needs.model";

export interface UserDonation {
  donateAt: string;
  bloodClass: BloodType;
  bloodStation: BloodStation;
}
