import { BloodType } from "@core/models/user.model";
import { City } from "@core/models/geography.model";

export type Need = 'need' | 'no_need';

export interface BloodStation {
  id: number;
  title: string;
  address: string;
  city: City;
}

export interface AddressNeeds {
  bloodStation: BloodStation;
  oPlus: Need,
  oMinus: Need,
  aPlus: Need,
  aMinus: Need,
  bPlus: Need,
  bMinus: Need,
  abPlus: Need,
  abMinus: Need,
}

export interface AddressNeedsFilters {
  bloodType?: BloodType | null;
  city?: string | null;
  title?: string | null;
}
