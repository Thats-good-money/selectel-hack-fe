import {City} from "@core/models/city.model";

export interface BonusResponse {
  count: number;
  num_pages: number;
  next: null | string;
  previous: null | string;
  results: Bonus[];
}

interface Bonus {
  id: number;
  bonus_image: string;
  partner_image: string;
  is_taken: boolean;
  bonus_name: string;
  partner_name: string;
  date_validity: string;
  is_published: boolean;
  h: number;
  w: number;
  cities: City[];
  priority: number;
}
