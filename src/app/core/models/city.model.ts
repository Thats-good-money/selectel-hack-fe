export interface City {
  id: number;
  title: string;
  slug: string;
  region_id: number;
  region: {
    id: number;
    title: string;
  };
  country: {
    id: number;
    title: string;
  };
  priority: number;
  lat: number;
  lng: number;
}

export interface CitiesResponse {
  count: number;
  num_pages: number;
  next: string | null;
  previous: string | null;
  results: City[];
}
