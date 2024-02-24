import { BloodType } from "@core/models/user.model";
import { City } from "@core/models/geography.model";

export type Need = 'need' | 'no_need' | null;

export interface BloodStation {
  id: number;
  title: string;
  address: string;
  cityDto: City;
  oplus: Need,
  ominus: Need,
  aplus: Need,
  aminus: Need,
  bplus: Need,
  bminus: Need,
  abPlus: Need,
  abMinus: Need,
}

export interface AddressNeedsFilters {
  bloodType?: BloodType | null;
  city?: string | null;
  title?: string | null;
}
