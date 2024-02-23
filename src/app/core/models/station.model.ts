import {City} from "@core/models/city.model";

interface Station {
  id: number;
  city_id: number;
  city: City;
  has_blood_group: boolean;
  schedule: Schedule[];
  phone_numbers: PhoneNumber[];
  lat: number;
  lng: number;
  blood_group: string[];
  blood_status: string;
  title: string;
  parser_url: string | null;
  is_get_from_parser: boolean;
  o_plus: string;
  o_minus: string;
  a_plus: string;
  a_minus: string;
  b_plus: string;
  b_minus: string;
  ab_plus: string;
  ab_minus: string;
  blood: string;
  plasma: string;
  platelets: string;
  erythrocytes: string;
  leukocytes: string;
  address: string;
  site: string;
  phones: string;
  email: string;
  worktime: string;
  without_registration: boolean;
  with_typing: boolean;
  for_moscow: boolean;
  closed: boolean;
  priority: number;
}

interface Schedule {
  id: number;
  dow: string; // Day of the Week
  start: string;
  end: string;
}

interface PhoneNumber {
  id: number;
  phone: string;
  comment: string;
}

export interface StationsResponse {
  count: number;
  num_pages: number;
  next: string | null;
  previous: string | null;
  results: Station[];
}
