export type Need = 'need' | 'no_need';

export interface BloodStation {
  id: number;
  title: string;
  address: string;
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



