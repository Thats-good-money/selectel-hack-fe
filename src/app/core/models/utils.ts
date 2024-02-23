
export interface Pagination<T> {
  count: number;
  numPages: number;
  next: number;
  previous: number;
  results: T[];
};
